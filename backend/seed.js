import User from './src/models/User.js'
import bcrypt from'bcrypt'
export const Register= async()=>{
  try{
    const hashedPassword=await bcrypt.hash('Admin',10);
    const newUser=new User({
      name:'admin',
      email:'admin@gmail.com',
      password:hashedPassword,
      role:'Admin'
    });
    await newUser.save();
    console.log('Admin user created successfully');
  }
  catch(err){
    console.log(err);
  }

}
