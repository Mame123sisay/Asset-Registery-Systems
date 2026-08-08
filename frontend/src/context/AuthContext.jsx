// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { client } from "../api/client";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("pos-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("pos-token"));
  const navigate = useNavigate();

  // useRef so the channel persists and isn’t recreated on every render
  const channelRef = useRef(new BroadcastChannel("auth"));

  async function login(userData, accessToken) {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem("pos-user", JSON.stringify(userData));
    localStorage.setItem("pos-token", accessToken);
    channelRef.current.postMessage("login");
  }

  async function logout() {
    await client.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
    setToken(null);
    localStorage.removeItem("pos-user");
    localStorage.removeItem("pos-token");
    //  Guard against closed channel
    if (channelRef.current) {
      try {
        channelRef.current.postMessage("logout");
      } catch {
        channelRef.current = new BroadcastChannel("auth");
        channelRef.current.postMessage("logout");
      }
    }
    navigate("/login");
  }

  async function refreshAccessToken() {
    try {
      const res = await client.post("/api/auth/refresh", {}, { withCredentials: true });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("pos-token", res.data.token);
      localStorage.setItem("pos-user", JSON.stringify(res.data.user));
    } catch {
      logout();
    }
  }

  // Sync across tabs
  useEffect(() => {
    const channel = channelRef.current;
    channel.onmessage = (event) => {
      if (event.data === "logout") {
        setUser(null);
        setToken(null);
        navigate("/login");
      }
    };
    //Don’t close the channel here — keep it alive
    return () => {
      channel.onmessage = null;
    };
  }, []);

  // On mount → try refresh
  useEffect(() => {
    refreshAccessToken();
  }, []);

  // Auto refresh before expiry
  useEffect(() => {
    if (!token) return;
    const { exp } = jwtDecode(token);
    const timeout = exp * 1000 - Date.now() - 60 * 1000;
    const timer = setTimeout(() => refreshAccessToken(), timeout);
    return () => clearTimeout(timer);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
