import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { client } from '../api/client';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await client.post('/api/auth/login', { email, password });

      if (response.data.success) {
        await login(response.data.user, response.data.token);
        if (response.data.user.role === 'Admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/it-staff-dashboard');
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900 relative px-4"
      style={{
        backgroundImage:"url('parliament-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0  bg-opacity-60"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl px-8 pt-8 pb-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Asset Management System
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Secure Asset Registry & Tracking
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-gray-700 placeholder:text-gray-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-600 text-sm mb-4 text-center font-medium">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-lg w-full shadow-md cursor-pointer transition-all duration-200"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} House of People's Representative's
        </p>
      </form>
    </div>
  );
}
