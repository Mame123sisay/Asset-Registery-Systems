import React, { useState } from 'react';
import { client } from '../api/client'; // axios instance

export default function DepartmentForm() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [manager, setManager] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await client.post('/api/departments', { name, code, manager });
      setMessage('Department created successfully!');
      setName('');
      setCode('');
      setManager('');
    } catch (err) {
      setMessage(err.message || 'Failed to create department');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center  bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Department</h2>

        <label className="block mb-3">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            className="border rounded w-full px-3 py-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Manager</span>
          <input
            type="text"
            className="border rounded w-full px-3 py-2 mt-1"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          />
        </label>

        {message && (
          <div className="text-center mb-3 text-sm text-blue-600">{message}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {loading ? 'Saving...' : 'Save Department'}
        </button>
      </form>
    </div>
  );
}
