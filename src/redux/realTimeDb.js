import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, query, orderByKey, startAfter, limitToFirst} from "firebase/database";




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
export const auth = getAuth(app);
export const db = getDatabase(app);

// Thunk для завантаження психологів з пагінацією
export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchPsychologists",
  async ({ lastKey = null, pageSize = 4 } = {}, { rejectWithValue }) => {

 // штучна помилка
  //  throw new Error("Тестова помилка завантаження");

    try {
      let q;

      if (lastKey) {
       
        q = query(
          ref(db, "psychologists"),
          orderByKey(),
          startAfter(lastKey),   
          limitToFirst(pageSize)
        );
      } else {
       
        q = query(
          ref(db, "psychologists"),
          orderByKey(),
          limitToFirst(pageSize)
        );
      }

      const snapshot = await get(q);

      if (!snapshot.exists()) {
        return { items: [], lastKey: null, hasMore: false };
      }

      const data = snapshot.val();
      const entries = Object.entries(data);

      const newLastKey = entries.length > 0 ? entries[entries.length - 1][0] : null;
      const hasMore = entries.length === pageSize;

      const items = entries.map(([id, value]) => ({ id, ...value }));

  

      return { items, lastKey: newLastKey, hasMore };
    } catch (error) {
      console.error("fetchPsychologists error ->", error);
      return rejectWithValue({
        message: error?.message || "Error loading psychologists",
        code: error?.code || null,
      });
    }
  }
);

export const fetchPsychologistById = createAsyncThunk(
  "psychologists/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const snapshot = await get(ref(db, `psychologists/${id}`));
      if (snapshot.exists()) {
        return { id, ...snapshot.val() };
      } else {
        return rejectWithValue("Psychologist not found");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Error loading");
    }
  }
);