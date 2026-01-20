import React from 'react';

export default function AssetTable({ data, page, limit, total, onPageChange, onOpen }) {
  const pages = Math.ceil(total / limit) || 1; // Compute total pages.

  return (
    <div>
      <table width="100%">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Type</th>
            <th>Make/Model</th>
            <th>RAM</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr
              key={a._id}
              onClick={() => onOpen(a._id)}
              style={{ cursor: 'pointer' }}
            >
              <td>{a.serialNumber}</td>
              <td>{a.type}</td>
              <td>{[a.make, a.model].filter(Boolean).join(' ')}</td>
              <td>{a.ramGB ?? '-'}</td>
              <td>{a.status}</td>
              <td>{new Date(a.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                No assets found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          marginTop: 12,
        }}
      >
        <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button disabled={page >= pages} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
