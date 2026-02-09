
import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
export const Login= async(req,res)=>{
  const{email,password}=req.body
  try
{
     const user=  await User.findOne({email});
    if(!user){
    return res.status(401).json({success:false,message:'user not found'});
  }
 const isMatch=await bcrypt.compare(password,user.password);
 if(!isMatch){
  res.status(401).json({success:false,message:'invalid credentials'});
 }
 const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
 return res.status(200).json({success:true,message:'login successful',token,user:{id:user._id,role:user.role,email:user.email,name:user.name,profilePicture:user.profilePicture}})
    
  }
  catch(error){
    return res.status(500).json({success:false,message:'internal server error'});
  }
 
}