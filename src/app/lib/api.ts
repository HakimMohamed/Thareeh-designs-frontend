import axios from "axios";
import { getToken } from "../utils/auth";
import { useIsAuthenticated } from "../stores/auth-model";
import { constants } from "../utils/constants";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const setIsOpen = useIsAuthenticated.getState().setIsOpen;

    if (
      error.response?.status === 401 &&
      !constants.PUBLIC_ROUTES.includes(error.config?.url)
    ) {
      setIsOpen(true);
    }

    return Promise.reject(error);
  }
);

export default api;
