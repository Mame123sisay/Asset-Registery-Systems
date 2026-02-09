import Asset from "../models/Asset.js";
import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
const addAssets=async(req,res)=>{
   try { 
    const { serialNumber, type, model, cpu, ramGB, storage, os, departmentId, assignedUserId, condition } = req.body;
     if (!serialNumber || !type) { 
      return res.status(400).json({ message: 'Serial number and type are required' }); 
    } 
    const existing = await Asset.findOne({ serialNumber }); 
    if (existing) { return res.status(409).json({ message: 'Asset with this serial number already exists' }); } 
    const asset = new Asset({ serialNumber, type, model, cpu, ramGB, storage, os, departmentId, assignedUserId, condition, });
     await asset.save();
      res.status(201).json({ message: 'Asset created successfully', asset }); } 
    catch (err) { console.error(err); 
      res.status(500).json({ message: 'Server error' }); } 

}
const getAssets=async(req,res)=>{
    try { 
    const { model, type, ramGB, condition, serialNumber, departmentName, userFullname,page,limit } = req.query;
     const filter = {};
      if (model) filter.model = { $regex: model, $options: 'i' }; 
      if (type) filter.type = type; 
      if (ramGB) filter.ramGB = Number(ramGB); 
      if (condition) filter.condition = condition;
      if (serialNumber) filter.serialNumber = { $regex: serialNumber, $options: 'i' }; 
      // Resolve department name to ObjectId 
      if (departmentName) {
         const dept = await Department.findOne({ name: { $regex: departmentName, $options: 'i' } });
          if (dept) filter.departmentId = dept._id; } 
          // Resolve user fullname to ObjectId
           if (userFullname) {
             const user = await Employee.findOne({ fullname: { $regex: userFullname, $options: 'i' } });
             if (user) filter.assignedUserId = user._id; } 
            // Pagination logic
             const skip = (page - 1) * limit; 
             const assets = await Asset.find(filter) .populate('departmentId', 'name') .populate('assignedUserId', 'fullname') .skip(skip) .limit(Number(limit));
              const total = await Asset.countDocuments(filter); res.json({ success: true, message: 'Assets fetched successfully', assets, total, page: Number(page), pages: Math.ceil(total / limit), });
            } catch (err) 
            { res.status(500).json({ message: 'Server error', error: err.message });
 }
}
const updateAssets=async(req,res)=>{
   try {
      const updatedAsset = await Asset.findByIdAndUpdate( req.params.id, req.body,
        { new: true } ) .populate('departmentId', 'name') .populate('assignedUserId', 'fullname');
        if (!updatedAsset) 
          return res.status(404).json({ message: 'Asset not found' });
          res.json(updatedAsset); 
        } catch (err) 
        { res.status(500).json({ message: 'Server error' }); } 
  
}
const deleteAssets=async(req,res)=>{
    try { 
   const deletedAsset = await Asset.findByIdAndDelete(req.params.id);
   if (!deletedAsset)

  return res.status(404).json({ message: 'Asset not found' }); 
  res.json({ message: 'Asset deleted successfully' }); 
                      } 
  catch (err)
   { res.status(500).json({ message: 'Server error' }); } 
                   

}
//Assets count by condition 
const getAssetByCondition=async(req,res)=>{
   try {
    const stats = await Asset.aggregate([
      { $group: { _id: "$condition", count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
const getAssetByDepartment=async(req,res)=>{
   try {
    const stats = await Asset.aggregate([
      { $group: { _id: "$departmentId", count: { $sum: 1 } } },
      { $lookup: { from: "departments", localField: "_id", foreignField: "_id", as: "department" } },
      { $unwind: "$department" },
      { $project: { name: "$department.name", count: 1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
const getAssetByUser=async(req,res)=>{
   try {
    const stats = await Asset.aggregate([
      { $group: { _id: "$assignedUserId", count: { $sum: 1 } } },
      { $lookup: { from: "orgusers", localField: "_id", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      { $project: { fullname: "$user.fullname", count: 1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
export {addAssets,getAssets,updateAssets, deleteAssets,getAssetByCondition,getAssetByDepartment,getAssetByUser}