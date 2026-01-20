import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  manager: { type: String }
}, { timestamps: true });

const Department = mongoose.model('Department', DepartmentSchema);
export default Department;
