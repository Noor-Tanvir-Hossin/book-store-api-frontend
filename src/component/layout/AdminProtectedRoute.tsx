import { logout, useCurrentToken, useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/features/hooks";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector(useCurrentToken);
  const user = useSelector(useCurrentUser);
  const location = useLocation();
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== "admin") {
    dispatch(logout()); 
    toast.success("Logout successful")
    // return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return children;
};

export default AdminProtectedRoute;
