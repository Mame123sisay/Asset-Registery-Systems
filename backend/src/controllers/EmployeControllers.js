import Employee from "../models/Employee.js";
const AddEmploye= async(req,res)=>{
  try{
    const{fullname,email,phone,departmentId}=req.body;
    console.log(fullname)
    const existingEmploye= await Employee.findOne({fullname});
    if(existingEmploye){
      res.status(409).json({success:false,message:'Employee already exist'});
    }
    const newEmploye= await  Employee.create({fullname,email,phone,departmentId});
    //populate department before sending back
    const populatedEmployee=await Employee.findById(newEmploye._id).populate('departmentId','name');
    console.log(populatedEmployee);
    res.status(201).json({success:true,message:'Employe created Successfully',newEmploye:populatedEmployee});

  }catch(error){
    res.status(500).json({message:'internal server error'});

  }

}
const getEmploye=async(req,res)=>{
  try{
     const employees=await Employee.find().populate('departmentId','name').sort({fullname:1});
     res.status(200).json({success:true,employees});
   

  }catch(error){
    res.status(500).json({message:'internal server error'});
  }

}
const deleteEmploye=async(req,res)=>{
   try 
      { const deletedEmploye = await Employee.findByIdAndDelete(req.params.id); 
        if (!deletedEmploye)
           { return res.status(404).json({ message: 'User not found' }); }
         res.json({ message: 'Employee deleted successfully' }); } 
         catch (err)
          { res.status(500).json({ message: 'Server error' }); }
       
}
const updateEmploye = async (req, res) => {
  try {
    const { fullname, email, departmentId, phone } = req.body;

    // update employee
    const updatedEmploye = await Employee.findByIdAndUpdate(
      req.params.id,
      { fullname, email, departmentId, phone },
      { new: true } // return the updated document
    );

    if (!updatedEmploye) {
      return res.status(404).json({ message: 'User not found' });
    }

    // populate department before sending back
    const populatedEmploye = await Employee.findById(updatedEmploye._id)
      .populate('departmentId', 'name');


    res.status(200).json({ success: true,message:'Employee Update successfully', updatedEmploye: populatedEmploye });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export{AddEmploye,getEmploye,deleteEmploye,updateEmploye}