import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("farmcart_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("farmcart_token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUserSession = async () => {
      if (token) {
        try {
          const res = await api.get("/auth/me");
          if (res.data && res.data.user) {
            setUser(res.data.user);
            localStorage.setItem("farmcart_user", JSON.stringify(res.data.user));
          }
        } catch (err) {
          console.error("Session verification failed:", err);
          logout();
        }
      }
      setLoading(false);
    };

    verifyUserSession();
  }, [token]);

  const loginUser = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token: newToken, user: userData } = res.data;
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("farmcart_token", newToken);
    localStorage.setItem("farmcart_user", JSON.stringify(userData));
    return userData;
  };

  const registerUser = async (registerData) => {
    const res = await api.post("/auth/register", registerData);
    if (res.data.token && res.data.user) {
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("farmcart_token", res.data.token);
      localStorage.setItem("farmcart_user", JSON.stringify(res.data.user));
    }
    return res.data;
  };

  const updateUserProfile = async (profileData) => {
    const res = await api.put("/auth/profile", profileData);
    if (res.data.user) {
      setUser(res.data.user);
      localStorage.setItem("farmcart_user", JSON.stringify(res.data.user));
    }
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("farmcart_token");
    localStorage.removeItem("farmcart_user");
  };

  const isBuyer = user?.role === "buyer";
  const isFarmer = user?.role === "farmer";
  const isAdmin = user?.role === "admin" || user?.isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginUser,
        registerUser,
        updateUserProfile,
        logout,
        isBuyer,
        isFarmer,
        isAdmin,
        isAuthenticated: !!token && !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
