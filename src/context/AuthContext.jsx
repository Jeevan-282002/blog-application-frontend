import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('access'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refresh'));

  const login = (access, refresh) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  };

  const value = {
    accessToken,
    refreshToken,
    login,
    logout,
    isAuthenticated: !!accessToken,
    setAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
