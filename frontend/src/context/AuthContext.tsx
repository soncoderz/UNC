"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { SafeUser, LoginInput, RegisterInput } from "@/types/api";
import api from "@/services/api";

interface AuthContextType {
  user: SafeUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (credentials: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("unc_token");
    if (storedToken) {
      setToken(storedToken);
      api.getCurrentUser(storedToken)
        .then((res) => {
          if (res.data) {
            setUser(res.data);
          } else {
            // Invalid token
            localStorage.removeItem("unc_token");
            setToken(null);
          }
        })
        .catch(() => {
          localStorage.removeItem("unc_token");
          setToken(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginInput) => {
    setIsLoading(true);
    try {
      const res = await api.loginUser(credentials.email, credentials.password);
      if (res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("unc_token", res.data.token);
      } else {
        throw new Error(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const res = await api.registerUser(data.email, data.password, data.name);
      if (res.data) {
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("unc_token", res.data.token);
      } else {
        throw new Error(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("unc_token");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
