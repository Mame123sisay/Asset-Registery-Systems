import express from 'express';
import Department from '../models/Department.js';

const router = express.Router();

// POST /api/departments - create a new department
router.post('/', async (req, res) => {
  try {
    const { name, manager } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    // Check for duplicate name
   const existing = await Department.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: 'Department already exists' });
    }

    const department = new Department({ name,manager });
    await department.save();

    res.status(201).json({
      message: 'Department created successfully',
      department,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/departments - list all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Update department
router.put('/:id', async (req, res) => {
  try {
    const { name, manager } = req.body;
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { name, manager },
      { new: true }
    );
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete department
router.delete('/:id', async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
