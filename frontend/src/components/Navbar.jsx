import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 w-full text-white px-4 py-3 flex items-center z-50 
        ${user ? "bg-blue-600" : "bg-none"}`}
    >
      {user && (
        <div className="flex items-center space-x-3 ml-auto">
          <img
            src={`${import.meta.env.VITE_API_URI}${user.profilePicture}`}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <span className="font-semibold">{user.name}</span>
        </div>
      )}
    </nav>
  );
}
