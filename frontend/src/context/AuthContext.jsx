// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { client } from '../api/client';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(()=>{
    const storedUser=localStorage.getItem('pos-user');
    return storedUser ? JSON.parse(storedUser):null;
  });
  const navigate=useNavigate();
  async function login(userData,token) {
    setUser(userData);
    localStorage.setItem('pos-user',JSON.stringify(userData));
    localStorage.setItem('pos-token',token);
  }

  function logout() {
    localStorage.removeItem('pos-token');
    localStorage.removeItem('pos-user');
    setUser(null);
    // 👇 redirect to home 
    navigate('/login');
  }


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
