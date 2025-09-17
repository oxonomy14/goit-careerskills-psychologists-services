import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

// Отримати __dirname (в ES-модулях його немає)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Шлях до ключа лежить поруч із скриптом
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

// Завантаження ключа
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// 🔹 Ініціалізація Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// 🔹 Завантаження psychologists.json (також з цієї папки або вкажи шлях)
const dataPath = path.join(__dirname, "psychologists.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

// 🔹 Імпорт у Firestore
async function importData() {
  for (const [id, value] of Object.entries(data)) {
    await db.collection("psychologists").doc(id).set(value);
  }
  console.log("✅ Імпорт завершено");
}

importData();
