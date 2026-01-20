import express from 'express';
import Asset from '../models/Asset.js';
import { authorize, requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Helper middlewares: you’ll implement these in middleware/authz.js
// - requireAuth: ensure user is logged in (similar to auth.js)
// - authorize(roles): check role is allowed
// POST /api/assets - 
// create new asset
 router.post('/', async (req, res) => 
  { try { 
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
      res.status(500).json({ message: 'Server error' }); } }); 
      
      
      
      
      
      
      
      // GET /api/assets - list all assets 
      router.get('/', async (req, res) => {
         try {
           const assets = await Asset.find() .populate('departmentId', 'name') .populate('assignedUserId', 'fullname') .sort({ createdAt: -1 });
            res.json(assets); 
          } 
            catch (err) 
            { console.error(err); 
              res.status(500).json({ message: 'Server error' }); }
             });
             // ✅ Update Asset 
             router.put('/:id', async (req, res) => {
               try {
                 const updatedAsset = await Asset.findByIdAndUpdate( req.params.id, req.body,
                   { new: true } ) .populate('departmentId', 'name') .populate('assignedUserId', 'fullname');
                    if (!updatedAsset) 
                      return res.status(404).json({ message: 'Asset not found' });
                     res.json(updatedAsset); 
                    } catch (err) 
                    { res.status(500).json({ message: 'Server error' }); } 
                  }); 
                  // ✅ Delete Asset 
                  router.delete('/:id', async (req, res) => {
                     try { 
                      const deletedAsset = await Asset.findByIdAndDelete(req.params.id);
                       if (!deletedAsset)
                         return res.status(404).json({ message: 'Asset not found' }); 
                        res.json({ message: 'Asset deleted successfully' }); 
                      } 
                      catch (err)
                       { res.status(500).json({ message: 'Server error' }); } 
                      });
// GET /api/assets — list with filters/pagination/sorting
router.get('/', requireAuth, authorize(['Admin', 'IT', 'Viewer']), async (req, res) => {
  const {
    type,
    departmentId,
    status,
    q,
    minRam,
    minStorage,
    page = 1,
    limit = 20,
    sort = 'updatedAt:desc',
  } = req.query;

  const filter = {};
  if (type) filter.type = type;
  if (departmentId) filter.departmentId = departmentId;
  if (status) filter.status = status;
  if (minRam) filter.ramGB = { $gte: Number(minRam) };

  const pipeline = [
    { $match: filter },
    ...(q ? [{ $match: { $text: { $search: q } } }] : []),
    ...(minStorage
      ? [
          { $addFields: { totalStorage: { $sum: '$storage.sizeGB' } } },
          { $match: { totalStorage: { $gte: Number(minStorage) } } },
        ]
      : []),
    { $sort: { [sort.split(':')[0]]: sort.endsWith(':desc') ? -1 : 1 } },
    { $skip: (Number(page) - 1) * Number(limit) },
    { $limit: Number(limit) },
  ];

  const data = await Asset.aggregate(pipeline);
  const total = await Asset.countDocuments(filter);
  res.json({ data, page: Number(page), limit: Number(limit), total });
});

// GET /api/assets/:id — asset detail
router.get('/:id', requireAuth, authorize(['Admin', 'IT', 'Viewer']), async (req, res) => {
  const asset = await Asset.findById(req.params.id)
    .populate('departmentId')
    .populate('assignedUserId');
  if (!asset) return res.status(404).json({ message: 'Not found' });
  res.json(asset);
});

// GET /api/assets/serial/:serialNumber — quick lookup
router.get('/serial/:serialNumber', requireAuth, authorize(['Admin', 'IT', 'Viewer']), async (req, res) => {
  const asset = await Asset.findOne({ serialNumber: req.params.serialNumber })
    .populate('departmentId')
    .populate('assignedUserId');
  if (!asset) return res.status(404).json({ message: 'Not found' });
  res.json(asset);
});

export default router;
