import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
apiKey: "AIzaSyAW3YJZyNf3LjrhMgzOZFlx3snP1QnIfbU",
  authDomain: "psychologists-services-1785a.firebaseapp.com",
  projectId: "psychologists-services-1785a",
  databaseURL: "https://psychologists-services-1785a-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "psychologists-services-1785a.appspot.com",
  messagingSenderId: "999312646709",
  appId: "1:999312646709:web:8b25bcd6f98c48e2fbc77c"
};

const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Firestore Database
//export const db = getFirestore(app);


// Realtime Database
export const db = getDatabase(app);