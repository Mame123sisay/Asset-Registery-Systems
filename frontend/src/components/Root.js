import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
const Root=() =>{
  const {user}=useAuth();
  const navigate=useNavigate();
  useEffect(()=>{
    //cheeck if the user is authenticated and redirect accordingly
    if(user){
      if (user.role==='Admin'){
      navigate('/admin-dashboard');
    }
      else if(user.role==='IT_Staff'){
      navigate('/it-staff-dashboard');
    }
      else{
      navigate('/login');
    }

    }
    else{
      navigate('/login');
    }
    
  },[user,navigate]);
  return null;
}
export default Root;