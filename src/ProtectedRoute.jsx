import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = () => {
    const { tokens } = useAuth();
  
    // Check if the user is authenticated
    if ((!(tokens.accessToken) && !(tokens.refreshToken)) ) {
      // If not authenticated, redirect to the login page
      return <Navigate to="/login" />;
    }
  
    // If authenticated, render the child routes
    return <Outlet />;
  };