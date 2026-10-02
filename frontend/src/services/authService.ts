import { setAccessToken, setRefreshToken } from "../utils/authStorage";
import { apiClient } from "./api";

type AuthResponse = {
  access: string;
  refresh: string;
};

export async function login(username: string, password: string): Promise<void> {
  const response = await apiClient.post<AuthResponse>("/auth/token/", {
    username,
    password,
  });

  const { access, refresh } = response.data;
  setAuthTokens(access, refresh);
}

export function setAuthTokens(access: string, refresh: string) {
  setAccessToken(access);
  setRefreshToken(refresh);
}
