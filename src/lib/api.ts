import axios from "axios";
import { useAuthModal } from "../stores/auth-modal";
import { constants } from "../utils/constants";
import { getTokens } from "./tokens";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
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
