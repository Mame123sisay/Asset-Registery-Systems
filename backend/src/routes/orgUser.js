// routes/orgUser.js
import express from 'express';
import OrgUser from '../models/OrgUser.js';

const router = express.Router();

// GET /api/org-users - list all OrgUsers
router.get('/', async (req, res) => {
  try {
    const users = await OrgUser.find()
      .populate('departmentId', 'name').populate('authUserId','role') // show department name
      .sort({ username: 1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
//update orgUser
router.put('/:id', async (req, res) => { 
  try { 
  const { fullname, email, departmentId} = req.body;
  const updatedUser = await OrgUser.findByIdAndUpdate( req.params.id, { fullname, email, departmentId }, { new: true } // return the updated document
 ).populate('departmentId', 'name');
  if (!updatedUser) {
     return res.status(404).json({ message: 'User not found' });
     }
   res.json(updatedUser); } 
   catch (err) 
   { res.status(500).json({ message: 'Server error' }); }
   });
//delete OrgUser
   router.delete('/:id', async (req, res) => { 
    try 
    { const deletedUser = await OrgUser.findByIdAndDelete(req.params.id); 
      if (!deletedUser)
         { return res.status(404).json({ message: 'User not found' }); }
       res.json({ message: 'OrgUser deleted successfully' }); } 
       catch (err)
        { res.status(500).json({ message: 'Server error' }); }
       });

export default router;
