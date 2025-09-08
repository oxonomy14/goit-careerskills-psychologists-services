import { configureStore } from '@reduxjs/toolkit';
import { campersReducer } from './campersSlice';
import {camperReducer} from "./camperSlice";
import { filterReducer } from './filterSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//const persistedReducer = persistReducer(persistConfig, rootReducer);

const persistConfigCampers = {
  key: 'campers',
  version: 1,
  storage,
};

const persistConfigFilter = {
  key: 'filters',
  version: 1,
  storage,
};


const persistConfigCamper = {
  key: 'camperDetail',
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: {
    campersList: persistReducer(persistConfigCampers, campersReducer),
    filter: persistReducer(persistConfigFilter, filterReducer),
    camper: persistReducer(persistConfigCamper, camperReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  devTools: import.meta.env.MODE === 'development',
});

export let persistor = persistStore(store);
