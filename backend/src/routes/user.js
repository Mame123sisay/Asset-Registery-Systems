import { addUser, deleteUser, editUser, editUserProfile, getUser, getUserById } from "../controllers/UserControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import express from 'express'
const router=express.Router();
router.post('/add',authMiddleware,addUser);
router.get('/',authMiddleware,getUser);
router.get('/:id',authMiddleware,getUserById);
router.put('/edit:id',authMiddleware,editUser);
// PUT update user (with profile picture upload)
 router.put("/:id", upload.single("profilePicture"), editUserProfile);
router.delete('/delete:id',authMiddleware,deleteUser);
export default router