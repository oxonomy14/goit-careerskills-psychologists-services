import { configureStore } from '@reduxjs/toolkit';
import { psychologistsReducer } from './psychologistsSlice';
import favoritesReducer from "./favoritesSlice";

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

const persistConfigPsychologists = {
  key: 'psychologists',
  version: 1,
  storage,
  whitelist: ['loading', 'loadingMore'], 

};


// const persistConfigFilter = {
//   key: 'filters',
//   version: 1,
//   storage,
// };


// const persistConfigCamper = {
//   key: 'camperDetail',
//   version: 1,
//   storage,
// };

export const store = configureStore({
  reducer: {
    psychologistsList: persistReducer(persistConfigPsychologists, psychologistsReducer),
    favorites: favoritesReducer,
    // filter: persistReducer(persistConfigFilter, filterReducer),
    // camper: persistReducer(persistConfigCamper, camperReducer),
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
