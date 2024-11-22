import { create } from "zustand";

export interface isAuthenticatedStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const useIsAuthenticated = create<isAuthenticatedStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}));
