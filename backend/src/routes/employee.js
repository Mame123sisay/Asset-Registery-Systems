// routes/orgUser.js
import express from 'express';
import Employee from '../models/Employee.js';
import AuthUser from '../models/AuthUser.js'
import authMiddleware from '../middleware/authMiddleware.js';
import { AddEmploye, deleteEmploye, getEmploye, updateEmploye } from '../controllers/EmployeControllers.js';
const router = express.Router();

//add employe to database
router.post('/add',authMiddleware,AddEmploye);
// GET /api/org-users - list all OrgUsers
router.get('/',authMiddleware,getEmploye);
//update orgUser
router.put('/edit:id',authMiddleware,updateEmploye);
//delete OrgUser
   router.delete('/delete:id',authMiddleware,deleteEmploye);
   

export default router;
