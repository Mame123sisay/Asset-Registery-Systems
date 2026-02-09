import React, { useState, useEffect } from 'react';
import { client } from '../api/client';

export default function AssetForm({onAssetCreated}) {
  const [serialNumber, setSerialNumber] = useState('');
  const [type, setType] = useState('Laptop');
  const [model, setModel] = useState('');
  const [cpu, setCpu] = useState('');
  const [ramGB, setRamGB] = useState('');
  const [storage, setStorage] = useState([{ kind: 'SSD', sizeGB: '' }]);
  const [osName, setOsName] = useState('');
  const [osVersion, setOsVersion] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [assignedUserId, setAssignedUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [condition, setCondition] = useState('New');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch departments and users for dropdowns
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

  // Add/remove storage entries
  const addStorage = () => setStorage([...storage, { kind: 'SSD', sizeGB: '' }]);
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
    const response=  await client.post('/api/assets', {
        serialNumber,
        type,
        model,
        cpu,
        ramGB: Number(ramGB),
        storage: storage.map(s => ({ kind: s.kind, sizeGB: Number(s.sizeGB) })),
        os: { name: osName, version: osVersion },
        departmentId,
        assignedUserId,
        condition},
        {
         headers:{
        Authorization:`Bearer ${localStorage.getItem('pos-token')}`
        }
        });
        onAssetCreated(response.data.asset);
      setMessage(response.data.message);
      // reset form
      setSerialNumber('');
      setType('Laptop');
      setModel('');
      setCpu('');
      setRamGB('');
      setStorage([{ kind: 'SSD', sizeGB: '' }]);
      setOsName('');
      setOsVersion('');
      setDepartmentId('');
      setAssignedUserId('');
      setCondition('New');
    } catch (err) {
      setMessage(err.message || 'Failed to create asset');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center  bg-gray-100 px-4 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Asset</h2>

        {/* Basic fields */}
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Serial Number" className="border rounded px-3 py-2"
            value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} required />
          <select className="border rounded px-3 py-2" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Laptop">Laptop</option>
            <option value="Desktop">Desktop</option>
          </select>
          <input type="text" placeholder="Model" className="border rounded px-3 py-2"
            value={model} onChange={(e) => setModel(e.target.value)} />
          <input type="text" placeholder="CPU" className="border rounded px-3 py-2"
            value={cpu} onChange={(e) => setCpu(e.target.value)} />
          <input type="number" placeholder="RAM (GB)" className="border rounded px-3 py-2"
            value={ramGB} onChange={(e) => setRamGB(e.target.value)} />
        </div>

        {/* Storage */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Storage</h3>
          {storage.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <select className="border rounded px-2 py-1" value={s.kind}
                onChange={(e) => updateStorage(i, 'kind', e.target.value)}>
                <option value="HDD">HDD</option>
                <option value="SSD">SSD</option>
              
              </select>
              <input type="number" placeholder="Size (GB)" className="border rounded px-2 py-1"
                value={s.sizeGB} onChange={(e) => updateStorage(i, 'sizeGB', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={addStorage} className="text-blue-600 text-sm">+ Add Storage</button>
        </div>

        {/* OS, Department, User, Condition */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input type="text" placeholder="OS Name" className="border rounded px-3 py-2"
            value={osName} onChange={(e) => setOsName(e.target.value)} />
          <input type="text" placeholder="OS Version" className="border rounded px-3 py-2"
            value={osVersion} onChange={(e) => setOsVersion(e.target.value)} />

          <select className="border rounded px-3 py-2" value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>

          <select className="border rounded px-3 py-2" value={assignedUserId}
            onChange={(e) => setAssignedUserId(e.target.value)}>
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>{u.fullname}</option>
            ))}
          </select>

          <select className="border rounded px-3 py-2" value={condition}
            onChange={(e) => setCondition(e.target.value)}>
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        {/* Feedback */}
        {message && <div className="text-center mb-3 text-sm text-blue-600">{message}</div>}

        {/* Submit */}
        <button type="submit" disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
          {loading ? 'Saving...' : 'Save Asset'}
        </button>
      </form>
    </div>
  );
}
