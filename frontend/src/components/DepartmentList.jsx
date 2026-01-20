import React, { useEffect, useState } from 'react';
import { client } from '../api/client';
import DepartmentForm from '../pages/DepartmentForm.jsx';
import DepartmentEditForm from '../pages/DepartmentEditForm.jsx';
export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editDept, setEditDept] = useState(null);
  useEffect(() => {
    async function fetchDepartments() {
      setLoading(true);
      try {
        const res = await client.get('/api/departments');
        setDepartments(res.data);
      } catch (err) {
        console.error('Failed to load departments', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDepartments();
  }, []);

  async function handleDelete(id) {
    try {
      await client.delete(`/api/departments/${id}`);
      setDepartments(departments.filter(d => d._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  }

 function handleEdit(department) { 
  setEditDept(department); // open modal with department data
   }
   function handleUpdated(updatedDept) {
     setDepartments(departments.map(d => d._id === updatedDept._id ? updatedDept : d));
     }

  return (
    <div className="p-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
  <h2 className="text-2xl font-bold text-center sm:text-left mb-4 sm:mb-0">
    Departments
  </h2>
  <button onClick={() => setShowForm(true)}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow 
               transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 
               focus:ring-blue-400 focus:ring-offset-2 hover:cursor-pointer"
  >
    + Add Department
  </button>
</div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border h border-gray-200 rounded-lg shadow-md ">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Manager</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d, idx) => (
                <tr
                  key={d._id}
                  className={`hover:bg-blue-50 transition-colors duration-200 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-md text-gray-700 ">{d.name}</td>
                  <td className="px-6 py-4 text-md text-gray-700">{d.manager}</td>
                  <td className="px-10 py-4 text-center flex justify-center ">
                    <button
                      onClick={() => handleEdit(d)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition-transform transform hover:scale-105 hover:cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(d._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-transform transform hover:scale-105 hover:cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {departments.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No departments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
           {/* Conditionally render the form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <button onClick={() => setShowForm(false)}
              className="text-red-600 font-bold hover:text-red-700 cursor-pointer float-right "
            >
              ✕
            </button>
            <DepartmentForm />
          </div>
        </div>
      )}
       {/* Edit Form Modal */}
      {editDept && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button onClick={() => setEditDept(null)} className="absolute top-2 right-2 text-red-600 font-bold hover:cursor-pointer">✕</button>
            <DepartmentEditForm department={editDept} onClose={() => setEditDept(null)}
              onUpdated={handleUpdated}
            />
          </div>
        </div>
      )}
        </div>
      )}
      
    </div>
  );

}