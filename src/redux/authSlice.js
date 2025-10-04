import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, dbFireStore } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Реєстрація з ім’ям
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      if (!name) {
        throw new Error("Name is required");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Оновлюємо профіль у Firebase Authentication
      await updateProfile(user, { displayName: name });

      // Записуємо користувача у Firestore
      await setDoc(doc(dbFireStore, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: name || "", // ← додаємо fallback, щоб не було undefined
        createdAt: new Date().toISOString(),
      });

      return {
        uid: user.uid,
        email: user.email,
        displayName: name,
      };
    } catch (error) {
      console.error("Error in registerUser:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Логін користувача
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const userDoc = await getDoc(doc(dbFireStore, "users", userCredential.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};

      return {
        uid: userCredential.user.uid,
        email: email,
        displayName: userData.displayName || ""
      };
    } catch (error) {
      console.error("Login error:", error);

      // Розбір помилки Firebase
      const firebaseErrors = {
        "auth/user-not-found": "User not found. Please register first.",
        "auth/wrong-password": "Incorrect password.",
        "auth/invalid-email": "Invalid email format.",
      };

      const errorMsg =
        firebaseErrors[error.code] || error.message || "Login failed.";

      return rejectWithValue(errorMsg);
    }
  }
);


export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
