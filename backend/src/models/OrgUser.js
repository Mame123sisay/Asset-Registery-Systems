// models/orgUser.js
import mongoose from "mongoose";

const OrgUserSchema = new mongoose.Schema({
  //username: { type: String, required: true },
  email: String,
  fullname: String,
  departmentId: { type: mongoose.Types.ObjectId, ref: 'Department' },

  // 🔗 Link to AuthUser
  authUserId: { type: mongoose.Types.ObjectId, ref: 'AuthUser' }
}, { timestamps: true });

export default mongoose.model('OrgUser', OrgUserSchema);
