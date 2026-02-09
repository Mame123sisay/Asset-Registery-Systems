import React, { useEffect, useState } from 'react';
import { client } from '../api/client';
import AssetForm from '../pages/AssetForm'
import AssetEditForm from '../pages/AssetEditForm';
export default function AssetLists() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm,setShowForm]=useState(false);
  const [editAsset, setEditAsset] = useState(null);
  const [filters, setFilters] = useState({
  serialNumber:'',
  model: '',
  type: '',
  ramGB: '',
  departmentName: '',
  userFullname: '',
  condition: ''
});
const [page, setPage] = useState(1); 
const [pages, setPages] = useState(1);
async function fetchAssets() {
   setLoading(true); 

   try { 
    const res = await client.get('/api/assets', 
    { params: {...filters,page,limit:5},
      headers:{
          Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        } }); 
   setAssets(res.data.assets); 
   setPages(res.data.pages);
   
  } catch (err) 
  { console.error('Failed to load assets', err); 

  } finally { setLoading(false); } }
  useEffect(() => {
     fetchAssets(); 
    },[filters,page]);

     function handleAssetCreated(newAsset) { 
    setAssets(prev => [...prev, newAsset]); }


  async function handleDelete(id) {
    if(window.confirm('Are you sure you want to delete this assets')){
      try {
      await client.delete(`/api/assets/delete${id}`,{
         headers:{
          Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        }
      });
      setAssets(assets.filter(a => a._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
    }
   
  }

  function handleEdit(asset) {
     setEditAsset(asset); }
     
  function handleUpdated(updatedAsset) 
  { setAssets(assets.map(a => a._id === updatedAsset._id ? updatedAsset : a));

   }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
  <h2 className="text-2xl font-bold text-center sm:text-left mb-4 sm:mb-0">
    Assets
  </h2>
  <button onClick={()=>setShowForm(true)}
    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow 
               transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 
               focus:ring-blue-400 focus:ring-offset-2 hover:cursor-pointer"
  >
    + Add Asset
  </button>
</div>
<div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <input 
    type="text"
     placeholder="Serial Number" 
     value={filters.serialNumber} 
     onChange={e => setFilters({ ...filters, serialNumber: e.target.value })}
      className="border rounded px-3 py-2"
/>
    <input
      type="text"
      placeholder="Model"
      value={filters.model}
      onChange={e => setFilters({ ...filters, model: e.target.value })}
      className="border rounded px-3 py-2"
    />
    <select
      value={filters.type}
      onChange={e => setFilters({ ...filters, type: e.target.value })}
      className="border rounded px-3 py-2"
    >
      <option value="">All Types</option>
      <option value="Laptop">Laptop</option>
      <option value="Desktop">Desktop</option>
     
    </select>
    <input
      type="text"
      placeholder="RAM (GB)"
      value={filters.ramGB}
      onChange={e => setFilters({ ...filters, ramGB: e.target.value })}
      className="border rounded px-3 py-2"
    />
    <input
      type="text"
      placeholder="DepartmentName"
      value={filters.departmentName}
      onChange={e => setFilters({ ...filters, departmentName: e.target.value })}
      className="border rounded px-3 py-2"
    />
    <input
      type="text"
      placeholder="User Fullname"
      value={filters.userFullname}
      onChange={e => setFilters({ ...filters, userFullname: e.target.value })}
      className="border rounded px-3 py-2"
    />
    <select
      value={filters.condition}
      onChange={e => setFilters({ ...filters, condition: e.target.value })}
      className="border rounded px-3 py-2"
    >
      <option value="">All Conditions</option>
      <option value="New">New</option>
      <option value="Good">Good</option>
      <option value="Fair">Fair</option>
       <option value="Poor">Poor</option>
    </select>
  </div>
  <div className="mt-4 flex space-x-2">
    <button
      onClick={fetchAssets}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
    >
      Apply Filters
    </button>
    <button
      onClick={() => { setFilters({ model:'', type:'', ramGB:'', departmentName:'', userFullname:'', condition:'' }); fetchAssets(); }}
      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
    >
      Clear
    </button>
  </div>
</div>
 <div className="flex justify-center mt-4 space-x-2"> <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50" > Prev </button> <span className="px-3 py-1">Page {page} of {pages}</span> <button disabled={page === pages} onClick={() => setPage(page + 1)} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50" > Next </button> </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          {/* Filter Bar */}

          <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-3 text-left text-sm font-semibold">Serial</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Model</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">CPU</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">RAM</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Storage</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">OS</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">User</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Condition</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((a, idx) => (
                <tr
                  key={a._id}
                  className={`hover:bg-blue-50 transition-colors duration-200 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">{a.serialNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{a.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{a.model}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{a.cpu}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{a.ramGB} GB</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {a.storage.map((s, i) => `${s.kind} ${s.sizeGB}GB`).join(', ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {a.os?.name} {a.os?.version}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{a.departmentId?.name || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{a.assignedUserId?.fullname || '—'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{a.condition}</td>
                  <td className="px-6 py-4 text-center flex justify-center">
                    <button
                      onClick={() => handleEdit(a)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2 transition-transform transform hover:scale-105 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-transform transform hover:scale-105 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {assets.length === 0 && (
                <tr>
                  <td colSpan="11" className="px-6 py-4 text-center text-gray-500">
                    No assets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
              {showForm && (
                            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50">
                              <div className="bg-white rounded-lg shadow-lg p-6 w-full mt-10 max-w-md">
                                <button onClick={() => setShowForm(false)}
                                  className="text-red-600 font-bold hover:text-red-700 cursor-pointer float-right "
                                >
                                  ✕
                                </button>
                                <AssetForm onAssetCreated={handleAssetCreated} />
                              </div>
                            </div>
                          )}
        </div>
      )}
      {/*} Modal: */}
      {editAsset && (
         <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-50"> <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
           <button onClick={() => setEditAsset(null)} className="absolute top-2 right-2 text-red-600 font-bold hover:cursor-pointer">✕</button>
            <AssetEditForm asset={editAsset} onClose={() => setEditAsset(null)} onUpdated={handleUpdated} /> 
              </div> 
              </div> )}
    </div>
  );
}
