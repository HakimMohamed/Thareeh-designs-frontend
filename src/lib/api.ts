import axios from "axios";
import { useAuthModal } from "../stores/auth-modal";
import {
  getTokens,
  isTokenExpired,
  refreshAccessToken,
  setTokens,
} from "./tokens";
import { constants } from "@/utils/constants";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

const isServer = () => {
  return typeof window === "undefined";
};
api.interceptors.request.use(
  async (config) => {
    if (isServer()) {
      const cookieStore = await (await import("next/headers")).cookies();
      const accessToken = cookieStore.get("accessToken");
      const refreshToken = cookieStore.get("refreshToken");
      if (accessToken) {
        const isExpired = isTokenExpired(accessToken.value);
        if (isExpired && refreshToken) {
          try {
            const newAccessToken = await refreshAccessToken();
            if (!newAccessToken) {
              return config;
            }
            setTokens(newAccessToken, refreshToken.value);
            config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
          } catch (err: any) {
            return config;
          }
        } else {
          config.headers["Authorization"] = `Bearer ${accessToken.value}`;
        }
      }
    } else {
      const { accessToken } = getTokens();
      if (accessToken) {
        const isExpired = isTokenExpired(accessToken);
        const { refreshToken } = getTokens();
        if (isExpired && refreshToken) {
          try {
            const newAccessToken = await refreshAccessToken();
            if (!newAccessToken) {
              return config;
            }
            setTokens(newAccessToken, refreshToken);
            config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
          } catch (err: any) {
            return config;
          }
        } else {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error.response.data.message);
  }
);

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    const setIsOpen = useAuthModal.getState().setIsOpen;
    console.log("Hey");
    if (
      error.response?.status === 401 &&
      !constants.PUBLIC_ROUTES.includes(error.config?.url)
    ) {
      setIsOpen(true);
    }

    return Promise.reject(error || "Error occurred");
  }
);

export default api;
