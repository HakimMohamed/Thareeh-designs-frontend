/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { create } from "zustand";
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  comlpeteRegistrationInterface,
  VerifyOtpCredentials,
} from "../lib/types";
import { getTokens, setTokens, removeTokens } from "../lib/tokens";
import api from "../lib/api";
import { redirect } from "next/navigation";
import axios from "axios";

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
  verifyOtp: (credentials: VerifyOtpCredentials) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  fetchUser: async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`
      );
      const user = response.data.data;
      set({ user });
    } catch (error: any) {
      set({ user: null });
    }
  },
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true }); // Explicitly set loading state
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        credentials
      );
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

  register: async (credentials: RegisterCredentials) => {
    set({ isLoading: true });
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        credentials
      );
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/complete-registeration`,
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

  verifyOtp: async (credentials: VerifyOtpCredentials) => {
    set({ isLoading: true }); // Explicitly set loading state
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/otp/verify`,
        credentials
      );
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

  logout: async () => {
    const { refreshToken } = getTokens();
    set({ user: null });
    removeTokens();
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        data: { refreshToken },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      redirect("/");
    }
  },
}));
