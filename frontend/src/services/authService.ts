import type { AuthMe } from "../types/auth";
import {
  clearTokens,
  setAccessToken,
  setRefreshToken,
} from "../utils/authStorage";
import { apiClient } from "./api";

type AuthResponse = {
  access: string;
  refresh: string;
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

export async function login(username: string, password: string): Promise<void> {
  const response = await apiClient.post<AuthResponse>("/auth/token/", {
    username,
    password,
  });

  const { access, refresh } = response.data;
  setAuthTokens(access, refresh);
}

export async function register(data: RegisterData): Promise<void> {
  await apiClient.post("/movies/auth/register/", data);
}

export function setAuthTokens(access: string, refresh: string): void {
  setAccessToken(access);
  setRefreshToken(refresh);
}

export async function authMe(): Promise<AuthMe> {
  const response = await apiClient.get<AuthMe>("/movies/auth/me/");
  return response.data;
}

export function logout(): void {
  clearTokens();
}
