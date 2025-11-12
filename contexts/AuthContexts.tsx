import { createContext, useContext, useState, ReactNode } from "react";
import { router } from "expo-router";

interface AuthContextType {
  isAuthenticated: boolean;
  isGuestMode: boolean;
  login: () => void;
  guestLogin: () => void;
  logout: () => void;
  switchToLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    setIsGuestMode(false);
    router.replace("/(tabs)");
  };

  const guestLogin = () => {
    setIsGuestMode(true);
    router.replace("/(tabs)");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsGuestMode(false);
    router.replace("/");
  };

  const switchToLogin = () => {
    setIsGuestMode(false);
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isGuestMode,
        login,
        guestLogin,
        logout,
        switchToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

