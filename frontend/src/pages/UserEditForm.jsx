import React, { useState, useEffect } from 'react';
import { client } from '../api/client';

export default function UserEditForm({ user, onClose, onUpdated }) {
  console.log(user)
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  //const [departmentId, setDepartmentId] = useState('');
  //const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [userRole,setUserRole]=useState([]);
  // 🔑 Sync props to state when user changes
  useEffect(() => {
    if (user) {
      setFullname(user.name || '');
      setEmail(user.email || '');
     // setDepartmentId(user.departmentId?._id || '');
      setRole(user.role|| '');
    }
  }, [user]);

  // Fetch departments for dropdown
  {/* 
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
  useEffect(()=>{
    const fetchRoles= async()=>{
      try {
        const res=await client.get('/api/user/role');
        setUserRole(res.data);
      }
      catch(err){
        console.error('failed to load user role',err);
      }

    }
    fetchRoles();

  },[])*/}
 useEffect(()=>{
    const fetchRoles= async()=>{
      try {
        const res=await client.get('/api/users',{
           headers:{
          Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        }
        });
        setUserRole(res.data.users);
        console.log(res.data.users)
      }
      catch(err){
        console.error('failed to load user role',err);
      }

    }
    fetchRoles();

  },[])

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await client.put(`/api/users/edit${user._id}`, {
        fullname,
        email,
        role
        //departmentId,
        //authUserId,
       
      },{ headers:{
          Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        }
      });
      setMessage('User updated successfully!');
      onUpdated(res.data.updatedUser); // update parent state
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
        <span className="text-gray-700">Roles</span>
        <select
          className="border rounded w-full px-3 py-2 mt-1"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
         
          {userRole.map((d) => (
            <option key={d.id} value={d.role}>
              {d.role}
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
