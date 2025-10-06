import { createContext, useContext } from 'react';

export const AuthModalContext = createContext({
  openLoginModal: () => {},
  openRegisterModal: () => {},
});

export const useAuthModal = () => useContext(AuthModalContext);
