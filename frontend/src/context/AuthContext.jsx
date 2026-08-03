// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { client } from "../api/client";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
 const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("pos-user");
  return storedUser ? JSON.parse(storedUser) : null;
});
const [token, setToken] = useState(localStorage.getItem("pos-token"));
  const navigate = useNavigate();

 async function login(userData, token) {
  setUser(userData);
  setToken(token);
  localStorage.setItem("pos-user", JSON.stringify(userData));
  localStorage.setItem("pos-token", token);
}

 useEffect(() => {
  async function initAuth() {
    try {
      // Try to refresh using cookie
      const res = await client.post("/api/auth/refresh", {});
      setToken(res.data.token);
      setUser(res.data.user);

      // Update localStorage with fresh values
      localStorage.setItem("pos-token", res.data.token);
      localStorage.setItem("pos-user", JSON.stringify(res.data.user));
    } catch {
      // Cookie missing or invalid → logout
      logout();
    }
  }
  initAuth();
}, []);


 async function logout() {
  await client.post("/api/auth/logout", {});
  localStorage.removeItem("pos-token");
  localStorage.removeItem("pos-user");
  setUser(null);
  setToken(null);
  navigate("/login");
}
 

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
