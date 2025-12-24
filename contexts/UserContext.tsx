"use client"

import { apiFetch } from "@/lib/axios";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateProfile: (formData: any) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser]: any = useState<User | null>(() => {
    // Load user from localStorage if available
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiFetch(`/auth/login`, {
        method: "POST",
        data: { email, password },
      });
      const loggedUser: User = { ...res.user, token: res.token };
      setUser(loggedUser);
    } catch (err: any) {
      throw new Error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiFetch(`/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: { name, email, password },
      });

      await login(email, password);
    } catch (err: any) {
      throw new Error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = async (formData: any) => {
    const response = await apiFetch("/users/update", {
      method: "PATCH",
      data: formData
    });

    if (response.user) {
      const loggedUser: User = { ...response.user, token: user.token };
      setUser(loggedUser);
    }
  };

  const refreshUser = async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const res = await apiFetch(`/auth/me`, {
      });
      setUser({ ...res.user, token: user.token });
    } catch (err) {
      console.error(err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout, refreshUser, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
};
