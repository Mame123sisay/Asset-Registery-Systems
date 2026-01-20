// Import axios to make HTTP requests with interceptors.
import axios from 'axios';

// Create an axios instance so all requests share baseURL and headers logic.
export const client = axios.create({
 baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000', // Use env var; fallback for local dev.
  timeout: 10000, // Prevent hanging; fail fast so UI can show errors.
});

// Attach token from localStorage before every request.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Persisted JWT from login.
  if (token) config.headers.Authorization = `Bearer ${token}`; // Standard Bearer header.
  return config;
});

// Global error handler to normalize API errors and optionally logout on 401.
client.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      // Optional: remove token and redirect to login on unauthorized.
      localStorage.removeItem('token');
    }
    // Throw a simplified error object so pages/components can show feedback.
    throw {
      message: err?.response?.data?.message || err.message || 'Request failed',
      status,
      data: err?.response?.data,
    };
  }
);
