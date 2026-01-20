import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAssetById } from '../api/assets';

export default function AssetDetailPage() {
  const { id } = useParams(); // Get asset ID from route.

  const { data, isLoading, error } = useQuery({
    queryKey: ['asset', id],
    queryFn: () => getAssetById(id).then((res) => res.data), // removed "id!"
    enabled: !!id, // Avoid request if id missing.
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Failed to load asset</div>;
  if (!data) return <div>Not found</div>;

  const a = data;

  return (
    <div style={{ padding: 16 }}>
      <Link to="/assets">← Back to assets</Link>
      <h1>Asset: {a.serialNumber}</h1>

      <section>
        <h2>Overview</h2>
        <p><strong>Type:</strong> {a.type}</p>
        <p><strong>Make/Model:</strong> {[a.make, a.model].filter(Boolean).join(' ')}</p>
        <p><strong>Status:</strong> {a.status}</p>
        <p><strong>RAM:</strong> {a.ramGB ?? '-'}</p>
        <p><strong>OS:</strong> {a?.os?.name} {a?.os?.version}</p>
      </section>

      <section>
        <h2>Storage</h2>
        <ul>
          {(a.storage || []).map((s, i) => (   // removed ": any"
            <li key={i}>
              {s.kind} — {s.sizeGB} GB
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Network</h2>
        <p><strong>Hostname:</strong> {a?.network?.hostname}</p>
        <p><strong>IP:</strong> {a?.network?.ipAddress}</p>
        <p><strong>MAC:</strong> {a?.network?.macAddress}</p>
      </section>

      <section>
        <h2>Assignments</h2>
        <p><strong>Department:</strong> {a?.departmentId?.name || '-'}</p>
        <p><strong>Assigned user:</strong> {a?.assignedUserId?.username || '-'}</p>
        <p><strong>Location:</strong> {[a?.location?.building, a?.location?.floor, a?.location?.room].filter(Boolean).join(', ')}</p>
        <p><strong>Condition:</strong> {a?.condition}</p>
      </section>

      <section>
        <h2>Warranty</h2>
        <p><strong>Vendor:</strong> {a?.warranty?.vendor}</p>
        <p><strong>Purchase:</strong> {a?.warranty?.purchaseDate ? new Date(a.warranty.purchaseDate).toLocaleDateString() : '-'}</p>
        <p><strong>Expiry:</strong> {a?.warranty?.expiryDate ? new Date(a.warranty.expiryDate).toLocaleDateString() : '-'}</p>
      </section>

      <section>
        <h2>Attachments</h2>
        <ul>
          {(a.attachments || []).map((att, i) => (   // removed ": any"
            <li key={i}>
              {att.type} — <a href={att.url} target="_blank" rel="noreferrer">Open</a> {att.note ? `(${att.note})` : ''}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
