// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { client } from '../api/client';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate=useNavigate();
  async function login(email, password) {
    const res = await client.post('/api/auth/login', { email, password });
    const { token, role, fullname, department, email: userEmail } = res.data;

    // store token and user info
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ email: email, role, fullname, department }));

    // update React state immediately
    setUser({ email: userEmail, role, fullname, department });
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    // 👇 redirect to home 
    navigate('/home');
  }

  // restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
