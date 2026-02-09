import React, { useState, useEffect } from 'react';
import { client } from '../api/client'; // axios instance

export default function EmployeAddForm({ onEmployeCreated }) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [fullname, setFullname] = useState('');
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({}); // field-specific errors

  // Fetch departments for dropdown
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await client.get('/api/departments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('pos-token')}`
          }
        });
        setDepartments(res.data.departments);
      } catch (err) {
        console.error('Failed to load departments', err);
      }
    }
    fetchDepartments();
  }, []);

  // Manual validation
  function validateForm() {
    const newErrors = {};
    if (!fullname.trim()) newErrors.fullname = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!email.includes("@")) newErrors.email = "Invalid email format";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    else if (phone.length < 10) newErrors.phone = "Phone must be at least 10 digits";
    if (!departmentId) newErrors.departmentId = "Department is required";
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
      const response = await client.post('/api/employees/add', {
        fullname,
        email,
        phone,
        departmentId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('pos-token')}`
        }
      });

      const newEmployee = response.data.newEmploye;
      onEmployeCreated(newEmployee);
      setMessage('Employee created successfully!');

      // reset form
      setPhone('');
      setEmail('');
      setDepartmentId('');
      setFullname('');
      setErrors({});
    } catch (err) {
      setMessage(err.message || 'Failed to create Employee');
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
        <h2 className="text-2xl font-bold mb-6 text-center">Add Employee</h2>

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
          <span className="text-gray-700">Phone</span>
          <input
            type="number"
            className="border rounded w-full px-3 py-2 mt-1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Department</span>
          <select
            className="border rounded w-full px-3 py-2 mt-1"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            <option value="">Select department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.departmentId && <p className="text-red-500 text-sm">{errors.departmentId}</p>}
        </label>

        {message && (
          <div className="text-center mb-3 text-sm text-blue-600">{message}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {loading ? 'Saving...' : 'Save Employee'}
        </button>
      </form>
    </div>
  );
}
