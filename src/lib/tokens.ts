import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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
  });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    secure: true,
    sameSite: "strict",
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
