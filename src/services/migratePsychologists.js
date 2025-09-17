import { ref, get, push, set, remove } from "firebase/database";
import { db } from "../firebase/firebase.js";

const migratePsychologists = async () => {
  try {
    const oldRef = ref(db, "psychologists");
    const snapshot = await get(oldRef);

    if (!snapshot.exists()) {
      console.log("Дані відсутні, мігрувати нічого.");
      return;
    }

    const data = snapshot.val();
    console.log("Старі ключі:", Object.keys(data));

    // 1. Переносимо кожен елемент у новий push-key
    for (const key of Object.keys(data)) {
      const item = data[key];
      const newRef = push(oldRef); // створює унікальний ключ
      await set(newRef, item);
      console.log(`✔️ Перенесено: ${item.name} → ${newRef.key}`);
    }

    // 2. Видаляємо старі дані з числовими ключами
    await remove(oldRef);
    console.log("❌ Старі дані видалено");

  } catch (error) {
    console.error("Помилка при міграції:", error);
  }
};

migratePsychologists();
