import mongoose from "mongoose";
const dbConnection=()=>{
  try{
 mongoose.connect(process.env.MONGODB_URI);
 console.log("database connected successfully");
  }
  catch(error){
    console.error("error in database connection:",error);

  }
};
export default dbConnection;