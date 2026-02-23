import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@/types";
import { currentUser, adminUser } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    if (password !== "bitsathy") return false;
    if (email === "admin@bitsathy.ac.in") {
      setUser(adminUser);
    } else if (email === "student@bitsathy.ac.in") {
      setUser(currentUser);
    } else {
      return false;
    }
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
