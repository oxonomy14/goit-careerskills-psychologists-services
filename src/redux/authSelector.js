// src/redux/authSelector.js

export const selectAuthUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectUserName = (state) => state.auth.user?.displayName;