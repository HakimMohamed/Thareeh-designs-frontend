/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {
  refreshAccessToken,
  getTokens,
  setTokens,
  isTokenExpired,
} from "./tokens";
import { constants } from "@/utils/constants";
import { useAuthModal } from "@/stores/auth-modal";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

const isServer = () => typeof window === "undefined";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

// Process the queue of failed requests
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// Add request interceptor
api.interceptors.request.use(
  async (config) => {
    let accessToken: string | null = null;
    let refreshToken: string | null = null;

    if (isServer()) {
      const cookieStore = await (await import("next/headers")).cookies();
      const accessTokenCookie = cookieStore.get("accessToken");
      const refreshTokenCookie = cookieStore.get("refreshToken");

      accessToken = accessTokenCookie?.value || null;
      refreshToken = refreshTokenCookie?.value || null;
    } else {
      const tokens = getTokens();
      accessToken = tokens.accessToken ?? null;
      refreshToken = tokens.refreshToken ?? null;
    }
    if (accessToken) {
      const isExpired = isTokenExpired(accessToken);

      if (isExpired && refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            setTokens(newAccessToken, refreshToken);
            config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          }
        } catch (err) {
          console.error("Error refreshing token:", err);
        }
      } else {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const setSignInIsOpen = useAuthModal.getState().setSignInIsOpen;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { refreshToken } = isServer()
          ? {
              refreshToken:
                (await (await import("next/headers")).cookies()).get(
                  "refreshToken"
                )?.value || null,
            }
          : getTokens();

        if (!refreshToken) {
          if (
            constants.ROUTES_REQUIRE_MODAL_OPEN[error.config.url] ===
            error.config.method
          ) {
            setSignInIsOpen(true);
          }
          return Promise.reject(error);
        }

        const newAccessToken = await refreshAccessToken(refreshToken);

        if (!newAccessToken) {
          processQueue(null);
          return Promise.reject(error);
        }

        setTokens(newAccessToken, refreshToken);
        processQueue(null, newAccessToken);
        console.log("refreshed", error.config.url);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
