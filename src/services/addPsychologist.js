import { ref, push, set } from "firebase/database";
import { db } from "./firebase"; // твій експорт db

const addPsychologist = async (newData) => {
  try {
    const listRef = ref(db, "psychologists");
    const newRef = push(listRef); // створює унікальний ключ
    await set(newRef, newData);
    console.log("Записано з ключем:", newRef.key); // напр. "-N3FzYh2Kl9..."
  } catch (error) {
    console.error("Помилка при додаванні:", error);
  }
};