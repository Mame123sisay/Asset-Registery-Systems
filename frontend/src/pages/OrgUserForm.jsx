import React, { useState, useEffect } from 'react';
import { client } from '../api/client'; // axios instance

export default function OrgUserForm({onUserCreated}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [fullname, setFullname] = useState('');
  const[role,setRole]=useState('');
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch departments for dropdown
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await client.get('/api/departments');
        setDepartments(res.data);
      } catch (err) {
        console.error('Failed to load departments', err);
      }
    }
    fetchDepartments();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
     const res= await client.post('/api/auth', {
        password,
        email,
        departmentId,
        fullname,
        role
      });
      // 🔥 get the created user from backend
       const { orgUser } = res.data; 
       // 🔥 call parent callback 
       onUserCreated(orgUser);
       setMessage('OrgUser created successfully!'); // if you have a list of users in state, update it immediately 
      // setUsers(prev => [...prev, orgUser]);
      setMessage('OrgUser created successfully!');
      setPassword('');
      setEmail('');
      setDepartmentId('');
      setFullname('');
      setRole(''); // reset role if needed
    } catch (err) {
      setMessage(err.message || 'Failed to create OrgUser');
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
        <h2 className="text-2xl font-bold mb-6 text-center">Add Org User</h2>
          <label className="block mb-3">
          <span className="text-gray-700">Full name</span>
          <input
            type="text"
            className="border rounded w-full px-3 py-2 mt-1"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            className="border rounded w-full px-3 py-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
           <label className="block mb-3">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            className="border rounded w-full px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Department</span>
          <select
            className="border rounded w-full px-3 py-2 mt-1"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            required
          >
            <option value="">Select department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>
          <select
  className="border rounded w-full px-3 py-2 mt-1"
  value={role}
  onChange={(e) => setRole(e.target.value)}
  required
>
<option value="">Select Role</option>
  <option value="Admin">Admin</option>
  <option value="IT">IT</option>
  <option value="Viewer">Viewer</option>
</select>


     

        {message && (
          <div className="text-center mb-3 text-sm text-blue-600">{message}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {loading ? 'Saving...' : 'Save Org User'}
        </button>
      </form>
    </div>
  );
}
