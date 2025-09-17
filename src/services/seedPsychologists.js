import { ref, push, set } from "firebase/database";
import { db } from "../firebase/firebase.js";
import fs from "fs";

// читаємо JSON-файл
const data = JSON.parse(
  fs.readFileSync(new URL("psychologists.json", import.meta.url))
);

const seedData = async () => {
  try {
    for (const psy of data) {
      const newRef = push(ref(db, "psychologists"));
      await set(newRef, psy);
      console.log("✅ Додано:", psy.name, "з ключем:", newRef.key);
    }
    console.log("🎉 Всі психологи успішно додані!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Помилка при заливці:", error);
    process.exit(1);
  }
};

seedData();
