import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const getTokens = () => ({
  accessToken: Cookies.get(ACCESS_TOKEN_KEY),
  refreshToken: Cookies.get(REFRESH_TOKEN_KEY),
});

export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    // secure: true,
    sameSite: "strict",
    path: "/",
  });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    // secure: true,
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

export const refreshAccessToken = async (
  refreshToken: string
): Promise<string | null> => {
  try {
    if (!refreshToken) return null;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
      {
        refreshToken,
      }
    );
    const { accessToken } = response.data.data;
    setTokens(accessToken, refreshToken);
    return accessToken;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log("Error refreshing token:", error);
    // removeTokens();
    return null;
  }
};
