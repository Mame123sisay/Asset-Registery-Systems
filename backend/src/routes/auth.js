// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthUser from '../models/AuthUser.js';
import OrgUser from '../models/Employee.js';
import { Login } from '../controllers/AuthController.js';

const router = express.Router();

// Signup: create both AuthUser + OrgUser
{/*router.post('/', async (req, res) => {
  const { email, password, role,fullname, departmentId } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const authUser = await AuthUser.create({ email, passwordHash, role });
    
    let orgUser = await OrgUser.create({
      email,
      fullname,
      departmentId,
      authUserId: authUser._id
    });
    // populate role and department before sending
     orgUser = await OrgUser.findById(orgUser._id) .populate('departmentId', 'name') .populate('authUserId', 'role');

    res.status(201).json({ message: 'User created', authUser, orgUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login: check AuthUser, then fetch OrgUser
{/*router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const authUser = await AuthUser.findOne({ email });
    if (!authUser) return res.status(401).json({ message: 'Incorrect email or password' });

    const valid = await bcrypt.compare(password, authUser.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Incorrect Email or Password' });

    const orgUser = await OrgUser.findOne({ authUserId: authUser._id }).populate('departmentId');

    const token = jwt.sign(
      { id: authUser._id, role: authUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
   
//console.log(token);
//console.log( authUser.role)
    res.json({
      token,
      role: authUser.role,
      fullname: orgUser?.fullname,
      department: orgUser?.departmentId?.name
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error',error:err.message });
  }
});*/}
router.post('/login',Login);

export default router;
