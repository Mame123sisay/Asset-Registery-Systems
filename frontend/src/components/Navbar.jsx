import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">HOPR ICT Asset Registry</h1>
      {user && <h1 className="text-2xl font-bold text-black">{user.fullname}</h1>}

      {/* Desktop menu */}
      <div className="space-x-4 hidden md:flex">
        {user ? (
          <>
            <a href="/assets" className="hover:underline">Dashboard</a>
            <a href="/assets" className="hover:underline">Assets</a>
            <a href="/departments" className="hover:underline">Departments</a>
            <a href="/org-user" className="hover:underline">Users</a>
            <button onClick={logout} className="hover:underline cursor-pointer">Logout</button>
          </>
        ) : (
          <>
            <a href="/home" className="hover:underline">Home</a>
            <a href="#about" className="hover:underline">About Us</a>
            <a href="#contact" className="hover:underline">Contact Us</a>
            <a href="/login" className="hover:underline">Login</a>
          </>
        )}
      </div>

      {/* Mobile menu toggle */}
      <button className="md:hidden hover:cursor-pointer" onClick={() => setOpen(!open)}>☰</button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-blue-600 flex flex-col items-center space-y-4 py-4 md:hidden">
          {user ? (
            <>
              <a href="/assets" className="hover:underline">Dashboard</a>
              <a href="/assets" className="hover:underline">Assets</a>
              <a href="/departments" className="hover:underline">Departments</a>
              <a href="/org-user" className="hover:underline">Users</a>
              <button onClick={logout} className="hover:underline cursor-pointer">Logout</button>
            </>
          ) : (
            <>
              <a href="/home" className="hover:underline">Home</a>
              <a href="#about" className="hover:underline">About Us</a>
              <a href="#contact" className="hover:underline">Contact Us</a>
              <a href="/login" className="hover:underline">Login</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
