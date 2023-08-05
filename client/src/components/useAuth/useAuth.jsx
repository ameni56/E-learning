import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Replace this with your actual authentication logic
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    // If the user is not authenticated and tries to access a private route,
    // redirect to the login page
    if (!isAuthenticated && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  return isAuthenticated;
};

export default useAuth;
