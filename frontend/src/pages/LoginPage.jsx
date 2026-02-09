import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { client } from '../api/client';

export default function LoginPage() {
  const { login } = useAuth();   // get login function from context
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError(null);
    setLoading(true);
    try{
      const response=await client.post('/api/auth/login',{
        email,password
      });
     
      if(response.data.success){
        await login(response.data.user,response.data.token)
        if(response.data.user.role==='Admin'){
          navigate('/admin-dashboard');
        }
        else {
          navigate('/it-staff-dashboard');
        }
      }
      else{
        alert(response.data.message)
      }

    }catch(error){
      setError(error.message)

    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4" style={{
  backgroundImage: "url('/parliament-bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center"
}}
>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <input
          type="email"
          className="border rounded w-full px-3 py-2 mb-3"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="border rounded w-full px-3 py-2 mb-3"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded w-full"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
