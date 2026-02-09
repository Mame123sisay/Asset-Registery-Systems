import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { addAssets, getAssets, updateAssets,deleteAssets, getAssetByCondition, getAssetByDepartment, getAssetByUser } from '../controllers/AssetControllers.js';
 


const router = express.Router();
// create new asset
 router.post('/', authMiddleware,addAssets); 
 router.get('/',authMiddleware,getAssets);
 router.put('/edit:id',authMiddleware,updateAssets);
 router.delete('/delete:id',authMiddleware,deleteAssets);
 router.get('/stats/condition', authMiddleware,getAssetByCondition);     
 router.get('/stats/department', authMiddleware,getAssetByDepartment);
 router.get('/stats/user',authMiddleware,getAssetByUser);
      
      
      
      
     
export default router;
