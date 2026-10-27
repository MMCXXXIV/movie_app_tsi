import { useEffect, useState } from "react";
import type { AuthMe } from "../types/auth";
import type { AuthProviderProps } from "../types/authContext";
import { authMe } from "../services/authService";
import { getAccessToken, clearTokens } from "../utils/authStorage";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthMe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function checkAuth() {
    try {
      const token = getAccessToken();

      if (!token) {
        return;
      }

      const currentUser = await authMe();
      setUser(currentUser);
    } catch {
      clearTokens();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function initializeAuth() {
      try {
        const token = getAccessToken();

        if (!token) return;

        const currentUser = await authMe();

        if (!cancelled) {
          setUser(currentUser);
        }
      } catch {
        clearTokens();

        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void initializeAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
