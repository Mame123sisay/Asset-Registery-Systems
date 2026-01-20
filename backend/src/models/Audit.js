import mongoose from "mongoose";
const AuditSchema = new mongoose.Schema({
  entity: { type: String, enum: ['Asset','Department','OrgUser'] },
  entityId: mongoose.Types.ObjectId,
  action: { type: String, enum: ['CREATE','UPDATE','DELETE'] },
  changes: Object,
  performedBy: { type: mongoose.Types.ObjectId, ref: 'AuthUser' }
}, { timestamps: true });
export default mongoose.model('Audit', AuditSchema);
