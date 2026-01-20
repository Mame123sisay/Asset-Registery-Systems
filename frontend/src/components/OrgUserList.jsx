import React, { useEffect, useState } from 'react';
import { client } from '../api/client';
import OrgUserForm from '../pages/OrgUserForm'
import OrgUserEditForm from '../pages/OrgUserEditForm';
export default function OrgUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  // Fetch OrgUsers
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await client.get('/api/org-users');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to load users', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // callback to add new user 
  function handleUserCreated(newUser) { 
    setUsers(prev => [...prev, newUser]); }

  // Delete user
  async function handleDelete(id) {
    try {
      await client.delete(`/api/org-users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  }

  // Edit user (simple inline prompt)
 function handleEdit(user) {
   setEditUser(user);
   } 
   function handleUpdated(updatedUser) { 
    setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
  
  }

  return (
    <div className="p-6">
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
  <h2 className="text-2xl font-bold text-center sm:text-left mb-4 sm:mb-0">
    OrgUsers
  </h2>
  <button onClick={()=>setShowForm(true)}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow 
               transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 
               focus:ring-blue-400 focus:ring-offset-2 hover:cursor-pointer"
  >
    + Add User
  </button>
</div>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-3 text-left text-sm font-semibold">Full Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr
                  key={u._id}
                  className={`hover:bg-blue-50 transition-colors duration-200 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-md text-gray-700">{u.fullname}</td>
                  <td className="px-6 py-4 text-md text-gray-700">{u.authUserId?.role ||'_'}</td>
                  <td className="px-6 py-4 text-md text-gray-700">{u.email}</td>
                  <td className="px-6 py-4 text-md text-gray-700">
                    {u.departmentId?.name || '—'}
                  </td>
                
                  <td className="px-6 py-4 text-center flex justify-center">
                    <button
                      onClick={() => handleEdit(u)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition-transform transform hover:scale-105 cursor-pointer "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-transform transform hover:scale-105 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
           {showForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                      <button onClick={() => setShowForm(false)}
                        className="text-red-600 font-bold hover:text-red-700 cursor-pointer float-right "
                      >
                        ✕
                      </button>
                      <OrgUserForm onUserCreated={handleUserCreated} />
                    </div>
                  </div>
                )}
        </div>
      )}
      {/*Modal: */}  
      {editUser && ( 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"> <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
           <button onClick={() => setEditUser(null)} className="absolute top-2 right-2 text-red-600 font-bold hover:cursor-pointer">✕</button> 
           <OrgUserEditForm user={editUser} onClose={() => setEditUser(null)} onUpdated={handleUpdated} /> 
            </div> 
            </div> )}
    </div>
  );
}
