import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema(
  {
    serialNumber: { type: String, required: true, unique: true, index: true },
    assetTag: { type: String, index: true },
    type: { type: String, enum: ['Laptop', 'Desktop'], required: true },
    model: String,
    cpu: String,
    ramGB: { type: Number, min: 1 },
    storage: [{ kind: { type: String, enum: ['HDD', 'SSD'] }, sizeGB: Number }],
    os: { name: String, version: String },
    //installedSoftware: [{ name: String, licenseKey: String, expiryDate: Date }],
    //network: { hostname: String, ipAddress: String, macAddress: String },
    departmentId: { type: mongoose.Types.ObjectId, ref: 'Department', index: true },
    assignedUserId: { type: mongoose.Types.ObjectId, ref: 'Employee' },
    location: { building: String, floor: String, room: String },
    condition: { type: String, enum: ['New', 'Good', 'Fair', 'Poor'] },
    //warranty: { vendor: String, purchaseDate: Date, expiryDate: Date },
    //status: { type: String, enum: ['Active', 'InRepair', 'Retired'], default: 'Active', index: true },
    //attachments: [{ url: String, type: String, note: String }],
    //notes: String,
    //createdBy: { type: mongoose.Types.ObjectId, ref: 'AuthUser' },
    //updatedBy: { type: mongoose.Types.ObjectId, ref: 'AuthUser' },
  },
  { timestamps: true }
);

{/*AssetSchema.index({ make: 'text', model: 'text', cpu: 'text', 'os.name': 'text' });*/}

export default mongoose.model('Asset', AssetSchema);
