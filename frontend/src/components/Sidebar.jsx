import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaBuilding,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar() {
  const { user, logout } = useAuth();

  // Define all possible menu items
  const adminMenu = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaTachometerAlt />, isParent: true },
    { name: "Assets", path: "/admin-dashboard/assets", icon: <FaBoxOpen /> },
    { name: "Departments", path: "/admin-dashboard/departments", icon: <FaBuilding /> },
    { name: "Employees", path: "/admin-dashboard/employes", icon: <FaUsers /> },
    { name: "Users", path: "/admin-dashboard/user", icon: <FaUsers /> },
    { name: "Profile", path: "/admin-dashboard/profile", icon: <FaUserCircle /> },
    { name: "Logout", path: "/login", icon: <FaSignOutAlt />, isLogout: true }
  ];

  const itStaffMenu = [
    { name: "Assets", path: "/it-staff-dashboard", icon: <FaBoxOpen /> },
     { name: "Profile", path: "/it-staff-dashboard/profile", icon: <FaUserCircle /> },
    { name: "Logout", path: "/login", icon: <FaSignOutAlt />, isLogout: true }
    
  ];

  // Choose menu based on role
  const menuItems = user?.role === "Admin" ? adminMenu : itStaffMenu;

  return (
    <div className="flex flex-col h-screen bg-[#0a3b6c] text-white w-16 md:w-64 fixed">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center py-3 border-b border-blue-800">
        <img
          src="/hopr-logo-circle.png"
          alt="Hopr Ethiopia ICT Asset Registry"
          className="w-16 h-12 md:w-24 md:h-24 object-contain mb-3"
        />
        <h2 className="font-bold text-lg">የኢ.ፌ.ዲ.ሪ የህዝብ ተወካዮች ምክር ቤት</h2>
        <span className="hidden md:block text-lg font-bold">Asset MS</span>
        <span className="md:hidden text-sm font-bold">AMS</span>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.isLogout ? (
                <button
                  onClick={logout}
                  className="flex items-center w-full p-2 rounded-md transition duration-200 hover:bg-red-500 cursor-pointer"
                >
                  <span>{item.icon}</span>
                  <span className="ml-4 hidden md:block">{item.name}</span>
                </button>
              ) : (
                <NavLink
                  end={item.isParent}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-md transition duration-200 hover:bg-gray-700 ${
                      isActive ? "bg-gray-500" : ""
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  <span className="ml-4 hidden md:block">{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
