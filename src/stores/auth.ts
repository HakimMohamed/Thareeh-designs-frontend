/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { create } from "zustand";
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  comlpeteRegistrationInterface,
} from "../lib/types";
import { getTokens, setTokens, removeTokens } from "../lib/tokens";
import api from "../lib/api";
import { redirect } from "next/navigation";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<string | void>;
  logout: () => Promise<void>;
  completeRegistration: (
    credentials: comlpeteRegistrationInterface
  ) => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  refreshAccessToken: async (): Promise<string | null> => {
    try {
      const { refreshToken } = getTokens();
      if (!refreshToken) return null;

      const response = await api.post("/api/auth/refresh-token", {
        refreshToken,
      });
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      setTokens(accessToken, newRefreshToken);
      return accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      removeTokens();
      set({ user: null });
      return null;
    }
  },

  fetchUser: async () => {
    try {
      const response = await api.get("/api/auth/user");
      const user = response.data.data;
      set({ user });
    } catch (error: any) {
      set({ user: null });
    }
  },
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true }); // Explicitly set loading state
    try {
      const response = await api.post("/api/auth/login", credentials);
      const { user, accessToken, refreshToken } = response.data.data;
      setTokens(accessToken, refreshToken);
      set({ user });
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Let the calling code handle the error
    } finally {
      set({ isLoading: false }); // Ensure loading state is reset
    }
  },

  register: async (credentials: RegisterCredentials) => {
    set({ isLoading: true });
    try {
      await api.post("/api/auth/register", credentials);
    } catch (error: any) {
      console.error("Register error:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";

      console.log(errorMessage);
      return Promise.reject(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  completeRegistration: async (credentials: comlpeteRegistrationInterface) => {
    set({ isLoading: true });
    try {
      const response = await api.post(
        "/api/auth/complete-registeration",
        credentials
      );
      const { user, accessToken, refreshToken } = response.data.data;

      setTokens(accessToken, refreshToken);
      set({ user });
    } catch (error: any) {
      console.error("Complete Registration error:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      return Promise.reject(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    const { refreshToken } = getTokens();
    set({ user: null });
    removeTokens();
    try {
      await api.delete("/api/auth/logout", {
        data: { refreshToken },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      redirect("/");
    }
  },
}));
