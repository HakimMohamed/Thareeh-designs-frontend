"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  comlpeteRegistrationInterface,
} from "./types";
import { getTokens, setTokens, removeTokens, isTokenExpired } from "./tokens";
import api from "./api";
import { AxiosError } from "axios";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<string | void>;
  logout: () => void;
  completeRegistration: (
    credentials: comlpeteRegistrationInterface
  ) => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAccessToken = async (): Promise<string | null> => {
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
      setUser(null);
      return null;
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      const { user, accessToken, refreshToken } = response.data.data;
      setTokens(accessToken, refreshToken);
      setUser(user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (
    credentials: RegisterCredentials
  ): Promise<string | void> => {
    try {
      await api.post("/api/auth/register", credentials);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: string | any) {
      console.error(error);
      if (error.response.status === 409) {
        return Promise.reject(error?.response.data.message);
      }
      return Promise.reject("Something went wrong");
    }
  };

  const completeRegistration = async (
    credentials: comlpeteRegistrationInterface
  ) => {
    try {
      const response = await api.post(
        "/api/auth/complete-registeration",
        credentials
      );
      const { user, accessToken, refreshToken } = response.data.data;

      setTokens(accessToken, refreshToken);
      setUser(user);
    } catch (error: AxiosError | any) {
      if (error.response.status === 409 || error.response.status === 403) {
        return Promise.reject(error?.response.data.message);
      }
      return Promise.reject("Something went wrong");
    }
  };
  const logout = async () => {
    const { refreshToken } = getTokens();

    await api.delete("/api/auth/logout", {
      data: { refreshToken },
    });
    removeTokens();
    setUser(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { accessToken, refreshToken } = getTokens();

        if (!accessToken || !refreshToken) {
          setIsLoading(false);
          return;
        }

        if (isTokenExpired(accessToken)) {
          const newAccessToken = await refreshAccessToken();
          if (!newAccessToken) {
            setIsLoading(false);
            return;
          }
        }

        const response = await api.get("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        refreshAccessToken,
        register,
        completeRegistration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
