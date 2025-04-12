// import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  useCurrentUser } from "../../../redux/features/auth/authSlice";
// import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";  // Assuming Sidebar component is already updated with ShadCN and Tailwind
// import ProtectedRoute from "../ProtectedRoute";
import { Outlet } from "react-router-dom";
// import { FaBook } from "react-icons/fa";
import {  TYUser } from "@/types";
// import { TUser } from '@/redux/features/auth/authSlice';

const Dashboard = () => {
  const user = useSelector(useCurrentUser);
//   const navigate = useNavigate();

  return (
    
      <div className="flex min-h-screen">
        {/* sidebar */}
        {user && <Sidebar user ={user as TYUser} />}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white text-center text-xl font-bold shadow-md p-4">
            {user?.role === "user" ? "User" : "Admin"} Dashboard
          </header>

          {/* Content */}
          <main className="flex-1 p-4 rounded-lg shadow-sm">
            <div className="border p-4 rounded-lg bg-white">
              <Outlet />
            </div>
          </main>

          {/* Footer */}
          <footer className="text-center py-4 mt-4 bg-gray-100">
            <div>© {new Date().getFullYear()} Bookstore. All Rights Reserved.</div>
          </footer>
        </div>
      </div>
    
  );
};

export default Dashboard;
