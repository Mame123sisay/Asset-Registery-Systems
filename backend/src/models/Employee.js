// models/orgUser.js
import mongoose from "mongoose";

const EmployeSchema = new mongoose.Schema({
  email: String,
  fullname:{type:String,required:true,unique:true},
  phone:{type:String},
  departmentId: { type: mongoose.Types.ObjectId, ref: 'Department' },
}, { timestamps: true });

export default mongoose.model('Employee', EmployeSchema);