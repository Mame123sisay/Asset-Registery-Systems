import express from "express";
import { Login,Refresh,Logout } from "../controllers/AuthController.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Login
router.post("/login", Login);

// Refresh
router.post("/refresh",Refresh);
// Logout
router.post("/logout",Logout);

export default router;
