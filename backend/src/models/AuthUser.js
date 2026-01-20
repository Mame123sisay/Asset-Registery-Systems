import mongoose from 'mongoose';
const AuthUserSchema=new mongoose.Schema({
  email:{
    type:String,
    unique:true
  },
  passwordHash:String,
  role:{
    type:String,
    enum:['Admin','IT','Viewer'],
    default:'Viewer'
  }},{timestamps:true});
  export default mongoose.model('AuthUser',AuthUserSchema);