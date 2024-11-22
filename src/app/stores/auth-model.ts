import { create } from "zustand";

export interface AuthModalStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const useIsAuthenticated = create<AuthModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => set({ isOpen: value }),
}));
