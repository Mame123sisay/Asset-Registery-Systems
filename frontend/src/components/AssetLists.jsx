import React, { useEffect, useState } from 'react';
import { client } from '../api/client';
import AssetForm from '../pages/AssetForm'
import AssetEditForm from '../pages/AssetEditForm';
export default function AssetLists() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm,setShowForm]=useState(false);
  const [editAsset, setEditAsset] = useState(null);
  useEffect(() => {
    async function fetchAssets() {
      setLoading(true);
      try {
        const res = await client.get('/api/assets');
        setAssets(res.data);
      } catch (err) {
        console.error('Failed to load assets', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAssets();
  }, []);

  async function handleDelete(id) {
    try {
      await client.delete(`/api/assets/${id}`);
      setAssets(assets.filter(a => a._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
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

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
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
                            <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-end">
                              <div className="bg-white rounded-lg shadow-lg p-6 w-full mt-10 max-w-md">
                                <button onClick={() => setShowForm(false)}
                                  className="text-red-600 font-bold hover:text-red-700 cursor-pointer float-right "
                                >
                                  ✕
                                </button>
                                <AssetForm />
                              </div>
                            </div>
                          )}
        </div>
      )}
      {/*} Modal: */}
      {editAsset && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"> <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
           <button onClick={() => setEditAsset(null)} className="absolute top-2 right-2 text-red-600 font-bold hover:cursor-pointer">✕</button>
            <AssetEditForm asset={editAsset} onClose={() => setEditAsset(null)} onUpdated={handleUpdated} /> 
              </div> 
              </div> )}
    </div>
  );
}
