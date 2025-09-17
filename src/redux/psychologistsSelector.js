// psychologistsSelectors.js
export const selectPsychologists = (state) => state.psychologistsList?.items ?? [];
export const selectPsychologistsLoading = (state) => state.psychologistsList?.loading ?? false;
export const selectPsychologistsLoadingMore = (state) => state.psychologistsList?.loadingMore ?? false;
export const selectPsychologistsError = (state) => state.psychologistsList?.error ?? null;
export const selectPsychologistsHasMore = (state) => state.psychologistsList?.hasMore ?? false;
export const selectPsychologistsLastKey = (state) => state.psychologistsList?.lastKey ?? null;