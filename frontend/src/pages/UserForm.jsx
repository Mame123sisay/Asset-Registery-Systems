import React, { useState } from 'react';
import { client } from '../api/client'; // axios instance

export default function UserForm({ onUserCreated }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({}); // store field-specific errors

  // manual validation
  function validateForm() {
    const newErrors = {};
    if (!fullname.trim()) newErrors.fullname = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!email.includes("@")) newErrors.email = "Invalid email format";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 4) newErrors.password = "Password must be at least 4 characters";
    if (!role) newErrors.role = "Role is required";
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await client.post('/api/users/add', {
        password,
        email,
        fullname,
        role
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('pos-token')}`
        }
      });

      const orgUser = response.data.newUser;
      onUserCreated(orgUser);
      setMessage(response.data.message);

      // reset form
      setPassword('');
      setEmail('');
      setFullname('');
      setRole('');
      setErrors({});
    } catch (err) {
      setMessage(err.message || 'Failed to create OrgUser');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>

        <label className="block mb-3">
          <span className="text-gray-700">Full name</span>
          <input
            type="text"
            className="border rounded w-full px-3 py-2 mt-1"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            className="border rounded w-full px-3 py-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            className="border rounded w-full px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Role</span>
          <select
            className="border rounded w-full px-3 py-2 mt-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="IT_Staff">IT_Staff</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
        </label>

        {message && (
          <div className="text-center mb-3 text-sm text-blue-600">{message}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {loading ? 'Saving...' : 'Save User'}
        </button>
      </form>
    </div>
  );
}
