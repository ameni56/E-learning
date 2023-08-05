import React from 'react';
import './App.css';
import Cards from './Cards';
import HeroSection from './HeroSection';
import Footer from './Footer';
import Navbar from './Navbar';
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
const HomeAgent=()=> {
  const { state } = useLocation(); // Use the useLocation hook to access the state

  // Get the logged-in user's email from the state (passed from the App component)
  const userEmail = state && state.userEmail ? state.userEmail : "";

  return (
    <>
    {/* <Navbar userEmail={userEmail} /> Pass the userEmail prop to the Navbar component */}
      {/* <HeroSection /> */}
      <Cards userEmail={userEmail}  />
      {/* <Footer /> */}
    </>
  );
}

export default HomeAgent;



