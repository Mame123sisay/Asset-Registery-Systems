import User from '../models/User.js'
import Employee from '../models/Employee.js';
import bcrypt from 'bcrypt'
const addUser=async(req,res)=>{
  try{
    const {fullname,password,role,email}=req.body;
    
    if(!fullname){
      res.status(400).json({success:false,message:'fullname required'});
      
    }
    const existingUser= await User.findOne({name:fullname.trim()});
    
    if(existingUser){
      res.status(409).json({success:false,message:'User already exists'})
    }
    const hashedPassword= await bcrypt.hash(password,10)
    const newUser=new User({name:fullname,email,password:hashedPassword,role});
    await newUser.save();
    res.status(201).json({
      success:true,message:' user created successfully',newUser
    });

  }
  catch(error){
    res.status(500).json({success:false,message:'server error in creating user'});
    console.log(error)
  }
}
const getUser=async(req,res)=>{
   try {
      const users = await User.find().sort({ username: 1 });
      res.status(200).json( {success:true,users});
    } catch (err) {
      console.error(err);
      res.status(500).json({success:false, message: 'Server error in getting user' });
    }

}
const getUserById = async (req, res) => { try { const user = await User.findById(req.params.id); if (!user) return res.status(404).json({ message: 'User not found' }); // find employee record linked to this user
 const employee = await Employee.findOne({ userId: user._id }).populate('departmentId', 'name'); res.json({ success: true, user, department: employee?.departmentId || null }); 
} catch (error)
 { res.status(500).json({ message: 'Internal server error', error: error.message });
 } };
 const editUserProfile=async(req,res)=>{
  //console.log(req.file)
  const{name,email}=req.body;
  const updateData={name,email};
  // if a new profile picture was uploaded
   if (req.file) { updateData.profilePicture = `/uploads/${req.file.filename}`; } const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }); if (!updatedUser) return res.status(404).json({ message: "User not found" }); res.json({ success: true, updatedUser });
 //const updateProfile= await User.findByIdAndUpdate(req.params.id),profilePicture
 }
const editUser=async(req,res)=>{
   try {
   
     const { fullname, email, role} = req.body; // 1. Update OrgUser 
  const updatedUser = await User.findByIdAndUpdate( req.params.id, {name:fullname, email, role }, { new: true } )
  console.log(updatedUser)
   if (!updatedUser)
     {
       return res.status(404).json({success:false, message: 'User not found' }); 
      } // 2. If role is provided, update AuthUser role 

    res.status(200).json( {success:true,message:'user update successfully',updatedUser}); } 
    catch (err)
     { console.error(err);
       res.status(500).json({ message: 'Server error', error: err.message }); }
}
const deleteUser=async(req,res)=>{
   try 
      { const deletedUser = await User.findByIdAndDelete(req.params.id); 
        if (!deletedUser)
           { return res.status(404).json({ success:false, message: 'User not found' }); }

         res.json({ message: 'OrgUser deleted successfully' }); } 
         catch (err)
          { res.status(500).json({ success:false,message: 'Server error' }); }
  
}
export{addUser,getUser,editUser,deleteUser,getUserById,editUserProfile}