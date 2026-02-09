import express from 'express';
import { addDepartment,deleteDepartment,getDepartment, updateDepartment } from '../controllers/DepartmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import Department from '../models/Department.js';

const router = express.Router();

// POST /api/departments - create a new department
router.post('/add',authMiddleware, addDepartment);
// GET /api/departments - list all departments
router.get('/',authMiddleware,getDepartment);
// Update department
router.put('/edit:id', authMiddleware,updateDepartment);

// Delete department
router.delete('/:id',authMiddleware,deleteDepartment);


export default router;
