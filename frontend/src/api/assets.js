import { client } from './client';

// Fetch paginated, filtered assets from backend.
export const listAssets = (params) => client.get('/api/assets', { params });

// Fetch a single asset by ID (detail page).
export const getAssetById = (id) => client.get(`/api/assets/${id}`);

// Create asset (Admin/IT).
export const createAsset = (payload) => client.post('/api/assets', payload);

// Update asset (Admin/IT).
export const updateAsset = (id, payload) =>
  client.patch(`/api/assets/${id}`, payload);

// Delete/retire asset (Admin/IT).
export const deleteAsset = (id) => client.delete(`/api/assets/${id}`);

// Lookup by serial number.
export const getAssetBySerial = (serialNumber) =>
  client.get(`/api/assets/serial/${serialNumber}`);
