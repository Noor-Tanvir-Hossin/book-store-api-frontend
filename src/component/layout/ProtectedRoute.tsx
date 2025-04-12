import { ReactNode } from "react";
import { useSelector } from "react-redux";
import {  useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector(useCurrentToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  

  return children;
};

export default ProtectedRoute;