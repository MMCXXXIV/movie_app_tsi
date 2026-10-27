import type { ReactNode } from "react";
import type { AuthMe } from "./auth";

export type AuthContextType = {
  user: AuthMe | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
};

export type AuthProviderProps = {
  children: ReactNode;
};
