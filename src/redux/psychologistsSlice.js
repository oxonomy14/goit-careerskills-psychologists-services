// psychologistsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchPsychologists, fetchPsychologistById } from './realTimeDb';

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState: {
    items: [],
    loading: false,
    loadingMore: false,
    error: null,
    lastKey: null,
    hasMore: true,
  },
  reducers: {},
  extraReducers: builder => {
    builder
     // list pcychologists
      .addCase(fetchPsychologists.pending, (state, action) => {
        if (!action.meta.arg.lastKey) state.loading = true;
        else state.loadingMore = true;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        const newItems = action.payload.items.filter(
          item => !state.items.some(existing => existing.id === item.id)
        );
        state.items.push(...newItems);

        state.lastKey = action.payload.lastKey;
        state.hasMore = action.payload.hasMore;
        state.loading = false;
        state.loadingMore = false;
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.error =
          action.payload?.message || action.error?.message || 'Unknown error';
        state.loading = false;
        state.loadingMore = false;
      })
 // one pcychologist
      .addCase(fetchPsychologistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPsychologistById.fulfilled, (state, action) => {
        const exists = state.items.find(p => p.id === action.payload.id);
        if (!exists) state.items.push(action.payload);
        state.loading = false;
      })
      
      .addCase(fetchPsychologistById.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      });

  },
});

export const psychologistsReducer = psychologistsSlice.reducer;
