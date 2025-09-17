import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";


const firebaseConfig = {
  apiKey: "AIzaSyAW3YJZyNf3LjrhMgzOZFlx3snP1QnIfbU",
  authDomain: "psychologists-services-1785a.firebaseapp.com",
  projectId: "psychologists-services-1785a",
  storageBucket: "psychologists-services-1785a.appspot.com",
  messagingSenderId: "999312646709",
  appId: "1:999312646709:web:8b25bcd6f98c48e2fbc77c"
};

const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);



export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetch",
  async ({ pageSize = 4, lastDocSnapshot = null }, { rejectWithValue }) => {
    try {
      let q = query(
        collection(db, "psychologists"),
        orderBy("name"),
        limit(pageSize)
      );

      if (lastDocSnapshot) {
        q = query(q, startAfter(lastDocSnapshot)); // має бути DocumentSnapshot
      }

      const snapshot = await getDocs(q);

      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const newLastDocSnapshot = snapshot.docs[snapshot.docs.length - 1] || null;
      const hasMore = snapshot.docs.length === pageSize;

      return { items, hasMore, newLastDocSnapshot };
    } catch (error) {
      return rejectWithValue(error.message || "Помилка при завантаженні психологів");
    }
  }
);