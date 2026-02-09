import Department from "../models/Department.js";
const addDepartment=async(req,res)=>{
   try {
      const { name, manager } = req.body;
  
      if (!name) {
        return res.status(400).json({success:false, message: 'Name is required' });
      }
  
      // Check for duplicate name
     const existing = await Department.findOne({ name });
      if (existing) {
        return res.status(409).json({success:false, message: 'Department already exists' });
      }
  
      const department = new Department({ name,manager });
      await department.save();
  
      res.status(201).json({
        success:true,
        message: 'Department created successfully',
        department,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
}
 const getDepartment=async(req,res)=>{
   try {
    const departments = await Department.find().sort({ name: 1 });
   
    res.json({success:true,departments});
  }
   catch (err) {
    console.error(err);
    res.status(500).json({ success:false,message: 'Server error in getting departmens' });
  }
}
const updateDepartment=async(req,res)=>{
   try {
      const { name, manager } = req.body;
      const department = await Department.findByIdAndUpdate(
        req.params.id,
        { name, manager },
        { new: true }
      );
      res.json({ success:true,department});
    } catch (err) {
      res.status(500).json({ success:false,message: 'Server error' });
    }
}
const deleteDepartment= async(req,res)=>{
   try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({success:true, message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }

}
export{addDepartment,getDepartment,updateDepartment,deleteDepartment}