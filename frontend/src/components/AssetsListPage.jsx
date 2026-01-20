import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { listAssets } from '../api/assets';
import FilterBar from '../components/FilterBar';
import AssetTable from '../components/AssetTable';
import { useNavigate } from 'react-router-dom';

const DEFAULT_FILTERS = {
  page: 1,
  limit: 20,
  sort: 'updatedAt:desc',
};

export default function AssetsListPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });

  // Memoize query key so React Query caches correctly.
  const queryKey = useMemo(() => ['assets', filters], [filters]);

  // Fetch data with server-side filters/pagination.
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => listAssets(filters).then((res) => res.data),
    keepPreviousData: true, // Smooth pagination UX.
  });

  // Update filters from FilterBar.
  const handleChange = (next) =>
    setFilters((prev) => ({ ...prev, ...next }));

  // Reset filters to defaults.
  const handleReset = () => setFilters({ ...DEFAULT_FILTERS });

  // Export current filtered results via backend endpoint.
  const handleExport = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/export/assets?` +   // ✅ use Vite env
          new URLSearchParams(
            Object.entries(filters).reduce((acc, [k, v]) => {
              if (v !== undefined && v !== null) acc[k] = String(v);
              return acc;
            }, {})
          )
      );
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'assets.csv'; // Or .xlsx depending on backend response.
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Export failed');
    }
  };

  // Navigate to asset detail on row click.
  const openAsset = (id) => navigate(`/assets/${id}`);

  return (
    <div style={{ padding: 16 }}>
      <h1>Assets</h1>

      <FilterBar
        filters={filters}
        onChange={handleChange}
        onReset={handleReset}
        onExport={handleExport}
      />

      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error?.message || 'Error loading assets'}</div>}

      {data && (
        <AssetTable
          data={data.data}
          page={data.page}
          limit={data.limit}
          total={data.total}
          onPageChange={(p) => handleChange({ page: p })}
          onOpen={openAsset}
        />
      )}
    </div>
  );
}
