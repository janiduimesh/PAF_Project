
import { Link, useLocation } from "react-router-dom";
import { ChefHat } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "bg-cook-orange text-white" : "hover:bg-cook-yellow/60";
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-cook-orange/40 to-cook-yellow/40 flex flex-col">
        {/* Logo */}
        <div className="p-4">
          <Link to="/" className="flex items-center justify-center">
            <div className="bg-cook-red text-white py-3 px-6 rounded-full text-2xl font-bold">
              LET'S COOK
            </div>
          </Link>
        </div>
        
        {/* Bowl Icon */}
        <div className="flex justify-center py-4">
          <div className="relative w-24 h-24">
            <div className="absolute w-full h-full rounded-b-full bg-cook-orange transform rotate-[190deg]"></div>
            <div className="absolute top-1/4 left-1/2 w-1 h-10 bg-brown-700 transform -translate-x-1/2 rotate-45"></div>
          </div>
        </div>
        
        {/* Menu Items */}
        <nav className="flex flex-col flex-1 mt-4">
          <Link to="/" className={`flex items-center p-3 mx-2 rounded-md ${isActive("/")}`}>
            <span className="ml-2">Daily Posts</span>
          </Link>
          <Link to="/recipes" className={`flex items-center p-3 mx-2 rounded-md ${isActive("/recipes")}`}>
            <span className="ml-2">Recipes</span>
          </Link>
          <Link to="/chefs" className={`flex items-center p-3 mx-2 rounded-md ${isActive("/chefs")}`}>
            <ChefHat size={18} />
            <span className="ml-2">Chefs</span>
          </Link>
          <Link to="/uploads" className={`flex items-center p-3 mx-2 rounded-md ${isActive("/uploads")}`}>
            <span className="ml-2">My Uploads</span>
          </Link>
          <Link to="/profile" className={`flex items-center p-3 mx-2 rounded-md ${isActive("/profile")}`}>
            <span className="ml-2">My Profile</span>
          </Link>
        </nav>
        
        {/* User Profile */}
        <div className="p-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-transparent flex justify-end items-center px-6">
          <div className="flex items-center space-x-4">
            <div className="text-green-600 flex items-center">
              <span className="mr-2">✓</span>
              <span>Active Users</span>
            </div>
            <button className="bg-cook-red text-white px-4 py-1 rounded-full">
              LogOut
            </button>
          </div>
        </div>
        
        {/* Page Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
