import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const tokenKey = "authToken";
const URL_BASE = "https://codeable-keep-api-auth-production.up.railway.app";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(tokenKey) !== null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(tokenKey);
  });

  const login = async (username: string, password: string) => {
    const url = `${URL_BASE}/login`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const body = await response.json();
      setToken(body.token);
      setIsAuthenticated(true);
      localStorage.setItem(tokenKey, body.token);
    } else {
      const error = await response.json();
      throw new Error(error.message || "Error en la autenticación");
    }
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}