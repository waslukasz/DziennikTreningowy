import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { setupAxiosInterceptors } from "../../axios/axios";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenProps } from "../../types/navigationStackParms";

export type AuthContextValue = {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  authenticate: (token: string, refreshToken: string) => void;
  logout: () => void;
};
type AuthContextProviderProps = {
  children: any; //To Do
};

export const AuthContext = createContext<AuthContextValue>({
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  authenticate: (token: string, refreshToken: string) => {},
  logout: () => {},
});

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authRefreshToken, setAuthRefreshToken] = useState<string | null>(null);
  function authenticate(token: string, refreshToken: string) {
    setAuthToken(token);
    setAuthRefreshToken(refreshToken);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("refreshToken", refreshToken);
  }

  function logout() {
    setAuthToken(null);
    setAuthRefreshToken(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("refreshToken");
  }
  const value: AuthContextValue = {
    token: authToken,
    refreshToken: authRefreshToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };
  useEffect(() => {
    setupAxiosInterceptors(value);
  }, [value]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
