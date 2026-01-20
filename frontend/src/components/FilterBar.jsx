import React from 'react';

export default function FilterBar({ filters, onChange, onReset, onExport }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 8,
        gridTemplateColumns: 'repeat(6, 1fr)',
        marginBottom: 12,
      }}
    >
      <select
        value={filters.type || ''}
        onChange={(e) => onChange({ type: e.target.value || undefined, page: 1 })}
      >
        <option value="">All types</option>
        <option value="Laptop">Laptop</option>
        <option value="Desktop">Desktop</option>
      </select>

      <select
        value={filters.status || ''}
        onChange={(e) => onChange({ status: e.target.value || undefined, page: 1 })}
      >
        <option value="">All status</option>
        <option value="Active">Active</option>
        <option value="InRepair">InRepair</option>
        <option value="Retired">Retired</option>
      </select>

      <input
        placeholder="Keyword"
        value={filters.q || ''}
        onChange={(e) => onChange({ q: e.target.value, page: 1 })}
      />

      <input
        type="number"
        placeholder="Min RAM (GB)"
        value={filters.minRam ?? ''}
        onChange={(e) =>
          onChange({
            minRam: e.target.value ? Number(e.target.value) : undefined,
            page: 1,
          })
        }
      />

      <input
        type="number"
        placeholder="Min storage (GB)"
        value={filters.minStorage ?? ''}
        onChange={(e) =>
          onChange({
            minStorage: e.target.value ? Number(e.target.value) : undefined,
            page: 1,
          })
        }
      />

      <select
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value })}
      >
        <option value="updatedAt:desc">Updated desc</option>
        <option value="updatedAt:asc">Updated asc</option>
        <option value="make:asc">Make asc</option>
      </select>

      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          gap: 8,
          justifyContent: 'flex-end',
        }}
      >
        <button onClick={onReset}>Reset</button>
        <button onClick={onExport}>Export</button>
      </div>
    </div>
  );
}
