import React, { useState, useEffect } from 'react';
import { client } from '../api/client';

export default function EmployeEditForm({ employe, onClose, onUpdated }) {
  
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const[phone,setPhone]=useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
 
  // 🔑 Sync props to state when user changes
  useEffect(() => {
    if (employe) {
      setFullname(employe.fullname || '');
      setEmail(employe.email || '');
       setPhone(employe.phone || '');
       setDepartmentId(employe.departmentId?._id || '');
     
    }
  }, [employe]);

  // Fetch departments for dropdown
  
     useEffect(() => {
    async function fetchDepartments() {
      try {
        const res = await client.get('/api/departments',{
           headers:{
          Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        }
        });
        setDepartments(res.data.departments);
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
      const res = await client.put(`/api/employees/edit${employe._id}`, {
        fullname,
        email,
        phone,
        departmentId
        
       
      },{ headers:{
          Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        }
      });
      setMessage(res.data.message);
      onUpdated(res.data.updatedEmploye); // update parent state
      onClose();           // close modal
    } catch (err) {
      setMessage(err.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>

      <label className="block mb-3">
        <span className="text-gray-700">Full Name</span>
        <input
          type="text"
          className="border rounded w-full px-3 py-2 mt-1"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
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
        <span className="text-gray-700">Phone</span>
        <input
          type="number"
          className="border rounded w-full px-3 py-2 mt-1"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <label className="block mb-3">
        <span className="text-gray-700">Departments</span>
        <select
          className="border rounded w-full px-3 py-2 mt-1"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
        >
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
      </label>


   

      {message && <div className="text-center mb-3 text-sm text-blue-600">{message}</div>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
