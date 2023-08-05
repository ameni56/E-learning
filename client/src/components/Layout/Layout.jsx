import { useEffect, useState } from "react";
import css from "./Layout.module.css";
import { BiLogOut, BiVideo, BiSearch } from "react-icons/bi";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  const { pathname } = useLocation();

  // Initialize state variables with the values from Local Storage
  const [storedUserEmail, setStoredUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const [storedUserMatricule, setStoredUserMatricule] = useState(localStorage.getItem("userMatricule") || "");

  // Update the state variables whenever the userEmail and userMatricule change
  useEffect(() => {
    setStoredUserEmail(localStorage.getItem("userEmail") || "");
    setStoredUserMatricule(localStorage.getItem("userMatricule") || "");
  }, []);

  const formatDateInFrench = (date) => {
    return new Intl.DateTimeFormat("fr", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Function to handle the logout action
  const handleLogout = () => {
    // Clear the user data from Local Storage and navigate to the login page
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userMatricule");
    // You may also want to clear the authentication token here if you have one
    // localStorage.removeItem("token");
    // Redirect to the login page
    window.location.href = "/login"; // or use the Navigate component if you prefer
  };

  const styles = {
    // ... Add any additional styles you need here
    videoIcon: {
      fontSize: "24px",
      color: "red", // Change the icon color to red
      cursor: "pointer",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
      maxWidth: "150px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      borderRadius: "9999px",
      padding: "5px 10px",
      color: "white", // Set the color of the search bar text to white
    },
    searchInput: {
      flex: 1,
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      color: "white", // Set the color of the search input text to white
    },
  };

  return (
    <div className={css.container}>
      <Sidebar />

      {/* Making the dashboard as the default route */}
      {pathname === "/" && <Navigate to="/DashboardFormateur" />}

      <div className={css.dashboard}>
        <div className={css.topBaseGradients}>
          <div className="gradient-red"></div>
          <div className="gradient-orange"></div>
          <div className="gradient-blue"></div>
        </div>

        <div className={css.header}>
          <span>{formatDateInFrench(new Date())}</span>

          {/* Search bar */}
          <div style={styles.searchBar}>
            <BiSearch size={18} />
            <input
              type="text"
              placeholder="Search"
              style={styles.searchInput}
            />
          </div>

          <div className={css.profile}>
            
            <div className={css.details}>
              {/* Use storedUserMatricule and storedUserEmail here */}
              <span>{storedUserEmail}</span>
              <span>{storedUserMatricule}</span>
            </div>
            <div className={css.icon}>
              {/* Add the Link component with the icon here */}
              <Link to="/home">
                <BiVideo style={styles.videoIcon} />
              </Link>
            </div>
          </div>

          {/* Logout button */}
          <div className={css.logoutButton} onClick={handleLogout}>
            <BiLogOut size={24} />
          </div>
        </div>

        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
