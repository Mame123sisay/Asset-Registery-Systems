import { useEffect, useState } from 'react';
import { listAssets } from '../api/assets';

export default function AssetsList() {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const [resp, setResp] = useState({ data: [], total: 0 });

  async function load() {
    const { data } = await listAssets(filters);
    setResp(data);
  }
  useEffect(() => { load(); }, [filters]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assets</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Search by keyword"
          onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
        />
        <select
          className="border rounded px-3 py-2"
          onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
        >
          <option value="">All Types</option>
          <option value="Laptop">Laptop</option>
          <option value="Desktop">Desktop</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">Serial</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Make</th>
              <th className="py-2 px-4">Model</th>
              <th className="py-2 px-4">RAM</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {resp.data.map(a => (
              <tr key={a._id} className="border-t">
                <td className="py-2 px-4">{a.serialNumber}</td>
                <td className="py-2 px-4">{a.type}</td>
                <td className="py-2 px-4">{a.make}</td>
                <td className="py-2 px-4">{a.model}</td>
                <td className="py-2 px-4">{a.ramGB}</td>
                <td className="py-2 px-4">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
