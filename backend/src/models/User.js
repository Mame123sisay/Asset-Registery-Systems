import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
  name:{type:String},
  email:{type:String,unique:true,required:true},
  password:{type:String,unique:true,required:true},
  role:{type:String,enum:['Admin','IT_Staff'],default:'IT_Staff'},
  profilePicture: { type: String, default: '/uploads/avatar.jpg' }// path to default avatar }
})
const User=mongoose.model('User',UserSchema);
export default User;