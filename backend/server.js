import express from 'express';      
import mongoose from 'mongoose';       
import dotenv from 'dotenv';          
import cors from 'cors';               
//import morgan from 'morgan';           
import dbConnection from './src/config/db.js';
import assetRoutes from './src/routes/assets.js';
import departmentRoutes from './src/routes/department.js';
import orgUserRoutes from './src/routes/orgUser.js'
import authRoutes from './src/routes/auth.js';
dotenv.config({override:true}); // Reads .env and attaches values to process.env

// 4) Create the Express app
const app = express();  
app.use(cors());
app.use(express.json())  

app.use('/api/departments',departmentRoutes);
app.use('/api/org-users',orgUserRoutes); 
app.use('/api/auth', authRoutes);     
app.use('/api/assets', assetRoutes);
app.use('/api/assets', assetRoutes);

dbConnection();
const PORT = process.env.PORT ||5000; 
app.listen(PORT, () => console.log(`API listening on :${PORT}`)); // Boot the server

//Yo9bD6I050awHwQ2=password
