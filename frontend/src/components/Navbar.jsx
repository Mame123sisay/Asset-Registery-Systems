import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white px-4 py-3 flex justify-between items-center z-50">
      <h1 className="font-bold text-lg">HOPR ICT Asset Registry</h1>

      {user ? (
        <div className="flex items-center space-x-3">
          <img
            src={`${import.meta.env.VITE_API_URL}${user.profilePicture}`} // fallback image
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <span className="font-semibold">{user.name}</span>
         {/* <button
            onClick={logout}
            className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>*/} 
        </div>
      ) : (
        <span className="italic">Not logged in</span>
      )}
    </nav>
  );
}
