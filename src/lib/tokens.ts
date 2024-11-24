import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "./api";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const getTokens = () => ({
  accessToken: Cookies.get(ACCESS_TOKEN_KEY),
  refreshToken: Cookies.get(REFRESH_TOKEN_KEY),
});

export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    secure: true,
    sameSite: "strict",
    path: "/",
  });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

export const removeTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

export const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const { refreshToken } = getTokens();
    if (!refreshToken) return null;
    const response = await api.post("/api/auth/refresh-token", {
      refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setTokens(accessToken, newRefreshToken);
    return accessToken;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    removeTokens();
    return null;
  }
};
