import express from 'express';      
import mongoose from 'mongoose';       
import dotenv from 'dotenv';          
import cors from 'cors';    
//import {Register} from './seed.js'           
//import morgan from 'morgan';           
import dbConnection from './src/config/db.js';
import assetRoutes from './src/routes/assets.js';
import departmentRoutes from './src/routes/department.js';
import employeeRoutes from './src/routes/employee.js'
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/user.js'

dotenv.config({override:true}); // Reads .env and attaches values to process.env

// 4) Create the Express app
const app = express();  
// Allow requests only from your frontend
app.use(cors({
    origin: "https://asset-registery-systems-1.onrender.com", // <-- FRONTEND URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you need cookies/auth headers
}));
app.use(express.json())  
app.use('/uploads', express.static('public/uploads'));

app.use('/api/departments',departmentRoutes);
app.use('/api/users',userRoutes);
app.use('/api/auth', authRoutes);     
app.use('/api/assets', assetRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/employees',employeeRoutes);
dbConnection();
//Register();

const PORT = process.env.PORT ||5000; 
app.listen(PORT, () => console.log(`API listening on :${PORT}`)); // Boot the server


