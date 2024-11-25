import { create } from "zustand";

export interface AuthModalStore {
  signInIsOpen: boolean;
  signUpIsOpen: boolean;
  setSignInIsOpen: (value: boolean) => void;
  setSignUpIsOpen: (value: boolean) => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  signInIsOpen: false,
  signUpIsOpen: false,
  setSignInIsOpen: (value: boolean) => set({ signInIsOpen: value }),
  setSignUpIsOpen: (value: boolean) => set({ signUpIsOpen: value }),
}));
