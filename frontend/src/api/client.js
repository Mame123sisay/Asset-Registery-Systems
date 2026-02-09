// Import axios to make HTTP requests with interceptors.
import axios from 'axios';

// Create an axios instance so all requests share baseURL and headers logic.
export const client = axios.create({
 baseURL: import.meta.env.VITE_API_URL, // Use env var; fallback for local dev.
  timeout: 10000, // Prevent hanging; fail fast so UI can show errors.
});

