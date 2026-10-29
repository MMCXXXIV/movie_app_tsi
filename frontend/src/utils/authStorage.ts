const AUTH_ACCESS_KEY = "access_token";
const AUTH_REFRESH_KEY = "refresh_token";

export function setAccessToken(token: string) {
  localStorage.setItem(AUTH_ACCESS_KEY, token);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(AUTH_ACCESS_KEY);
}

export function setRefreshToken(token: string) {
  localStorage.setItem(AUTH_REFRESH_KEY, token);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(AUTH_REFRESH_KEY);
}

export function setAuthTokens(access: string, refresh: string) {
  setAccessToken(access);
  setRefreshToken(refresh);
}

export function clearTokens() {
  localStorage.removeItem(AUTH_ACCESS_KEY);
  localStorage.removeItem(AUTH_REFRESH_KEY);
}
