import React, { useEffect, useState } from 'react';
import { client } from '../api/client';
import OrgUserForm from './UserForm'
import OrgUserEditForm from './UserEditForm';
import EmployeAddForm from './EmployeAddForm';
import EmployeEditForm from './EmployeEditForm';
export default function EmployList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  // Fetch OrgUsers
  useEffect(() => {
    async function fetchEmployees() {
      setLoading(true);
      try {
        const res = await client.get('/api/employees',{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('pos-token')}`
          }
        });
        setEmployees(res.data.employees);
       
      } catch (err) {
        console.error('Failed to load users', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, []);

  // callback to add new user 
  function handleEmployeCreated(newEmployee) { 
    setEmployees(prev => [...prev,newEmployee]); }

  // Delete user
  async function handleDelete(id) {
    if(window.confirm('Are you sure you want to delete this Employee')){
    try {
      await client.delete(`/api/employees/delete${id}`,{
         headers:{
            Authorization:`Bearer ${localStorage.getItem('pos-token')}`
          }
      });
      setEmployees(employees.filter(e => e._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
    }
   
  }

  // Edit user (simple inline prompt)
 function handleEdit(employee) {
   setEditEmployee(employee);
   } 
   function handleUpdated(updatedEmployee) { 
    setEmployees(employees.map(e => e._id === updatedEmployee._id ? updatedEmployee : e));
  
  }

  return (
    <div className="p-6">
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
  <h2 className="text-2xl font-bold text-center sm:text-left mb-4 sm:mb-0">
    Employees
  </h2>
  <button onClick={()=>setShowForm(true)}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow 
               transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 
               focus:ring-blue-400 focus:ring-offset-2 hover:cursor-pointer"
  >
    + Add Employee
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
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
                {/*<th className="px-6 py-3 text-left text-sm font-semibold">Department</th>*/}
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e, idx) => (
                <tr
                  key={e._id}
                  className={`hover:bg-blue-50 transition-colors duration-200 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-md text-gray-700">{e.fullname}</td>
                  <td className="px-6 py-4 text-md text-gray-700">{e.phone}</td>
                  <td className="px-6 py-4 text-md text-gray-700">{e.email}</td>
                 <td className="px-6 py-4 text-md text-gray-700">
                    {e.departmentId?.name || '—'}
                  </td>
                
                  <td className="px-6 py-4 text-center flex justify-center">
                    <button
                      onClick={() => handleEdit(e)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition-transform transform hover:scale-105 cursor-pointer "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(e._id)}
                      
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-transform transform hover:scale-105 cursor-pointer"
                    >
                      Delete
                    </button>
                    
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
           {showForm && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                      <button onClick={() => setShowForm(false)}
                        className="text-red-600 font-bold hover:text-red-700 cursor-pointer float-right "
                      >
                        ✕
                      </button>
                      <EmployeAddForm onEmployeCreated={handleEmployeCreated} />
                    </div>
                  </div>
                )}
        </div>
      )}
      {/*Modal: */}  
      {editEmployee && ( 
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50 "> <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
           <button onClick={() => setEditEmployee(null)} className="absolute top-2 right-2 text-red-600 font-bold hover:cursor-pointer">✕</button> 
           <EmployeEditForm employe={editEmployee} onClose={() => setEditEmployee(null)} onUpdated={handleUpdated} /> 
            </div> 
            </div> )}
    </div>
  );
}
