/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {
  refreshAccessToken,
  getTokens,
  setTokens,
  isTokenExpired,
} from "./tokens";
// import { constants } from "@/utils/constants";
// import { useAuthModal } from "@/stores/auth-modal";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const isServer = () => typeof window === "undefined";

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
          if (config.url === "/api/auth/user") {
            console.log(newAccessToken);
          }

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
    // const setSignInIsOpen = useAuthModal.getState().setSignInIsOpen;

    // if (error.response?.status === 401) {
    //   if (
    //     constants.ROUTES_REQUIRE_MODAL_OPEN[error.config.url] ===
    //     error.config.method
    //   ) {
    //     setSignInIsOpen(true);
    //   }
    // }
    return Promise.reject(error);
  }
);

export default api;
