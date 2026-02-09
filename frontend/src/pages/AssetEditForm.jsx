import React, { useState, useEffect } from 'react';
import { client } from '../api/client';

export default function AssetEditForm({ asset, onClose, onUpdated }) {
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [cpu, setCpu] = useState('');
  const [ramGB, setRamGB] = useState('');
  const [storage, setStorage] = useState([]);
  const [osName, setOsName] = useState('');
  const [osVersion, setOsVersion] = useState('');
  const [condition, setCondition] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [assignedUserId, setAssignedUserId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (asset) {
      setSerialNumber(asset.serialNumber || '');
      setType(asset.type || '');
      setModel(asset.model || '');
      setCpu(asset.cpu || '');
      setRamGB(asset.ramGB || '');
      setStorage(asset.storage || []);
      setOsName(asset.os?.name || '');
      setOsVersion(asset.os?.version || '');
      setCondition(asset.condition || '');
      setDepartmentId(asset.departmentId?._id || '');
      setAssignedUserId(asset.assignedUserId?._id || '');
    }
  }, [asset]);

  useEffect(() => {
    async function fetchData() {
      try {
        const depRes = await client.get('/api/departments',{
           headers:{
          Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        }
        });
        setDepartments(depRes.data.departments);
        const userRes = await client.get('/api/employees',{
           headers:{
          Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        }
        });
        setUsers(userRes.data.employees);
      } catch (err) {
        console.error('Failed to load dropdown data', err);
      }
    }
    fetchData();
  }, []);

  const updateStorage = (index, field, value) => {
    const newStorage = [...storage];
    newStorage[index][field] = value;
    setStorage(newStorage);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await client.put(`/api/assets/edit${asset._id}`, {
        serialNumber,
        type,
        model,
        cpu,
        ramGB,
        storage,
        os: { name: osName, version: osVersion },
        condition,
        departmentId,
        assignedUserId,
      },
    {
       headers:{
          Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        }
    });
      setMessage('Asset updated successfully!');
      onUpdated(res.data);
      onClose();
    } catch (err) {
      setMessage(err.message || 'Failed to update asset');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Asset</h2>

      <label className="block mb-3">
        <span className="text-gray-700">Serial Number</span>
        <input type="text" className="border rounded w-full px-3 py-2 mt-1"
          value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} required />
      </label>

      <label className="block mb-3">
        <span className="text-gray-700">Type</span>
        <select className="border rounded w-full px-3 py-2 mt-1"
          value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select type</option>
          <option value="Laptop">Laptop</option>
          <option value="Desktop">Desktop</option>
        </select>
      </label>

      <label className="block mb-3">
        <span className="text-gray-700">Model</span>
        <input type="text" className="border rounded w-full px-3 py-2 mt-1"
          value={model} onChange={(e) => setModel(e.target.value)} />
      </label>

      <label className="block mb-3">
        <span className="text-gray-700">CPU</span>
        <input type="text" className="border rounded w-full px-3 py-2 mt-1"
          value={cpu} onChange={(e) => setCpu(e.target.value)} />
      </label>

      <label className="block mb-3">
        <span className="text-gray-700">RAM (GB)</span>
        <input type="number" className="border rounded w-full px-3 py-2 mt-1"
          value={ramGB} onChange={(e) => setRamGB(e.target.value)} />
      </label>

      <div className="mb-3">
        <span className="text-gray-700">Storage</span>
        {storage.map((s, i) => (
          <div key={i} className="flex gap-2 mt-1">
            <select className="border rounded px-2 py-1"
              value={s.kind} onChange={(e) => updateStorage(i, 'kind', e.target.value)}>
              <option value="HDD">HDD</option>
              <option value="SSD">SSD</option>
            </select>
            <input type="number" className="border rounded px-2 py-1"
              value={s.sizeGB} onChange={(e) => updateStorage(i, 'sizeGB', e.target.value)} />
          </div>
        ))}
      </div>

      <label className="block mb-3">
        <span className="text-gray-700">OS Name</span>
        <input type="text" className="border rounded w-full px-3 py-2 mt-1"
          value={osName} onChange={(e) => setOsName(e.target.value)} />
      </label>

      <label className="block mb-3">
        <span className="text-gray-700">OS Version</span>
        <input type="text" className="border rounded w-full px-3 py-2 mt-1"
          value={osVersion} onChange={(e) => setOsVersion(e.target.value)} />
      </label>

      <label className="block mb-3">
        <span className="text-gray-700">Condition</span>
        <select className="border rounded w-full px-3 py-2 mt-1"
          value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="">Select condition</option>
          <option value="New">New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
        </select>
      </label>

      <label className="block mb-3">
        <span className="text-gray-700">Department</span>
        <select className="border rounded w-full px-3 py-2 mt-1"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>
      </label>

      <label className="block mb-3">
        <span className="text-gray-700">Assigned User</span>
        <select className="border rounded w-full px-3 py-2 mt-1"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}>
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.fullname}</option>
          ))}
        </select>
      </label>

      {message && <div className="text-center mb-3 text-sm text-blue-600">{message}</div>}

      <button type="submit" disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
