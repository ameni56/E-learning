import { Route, Routes, Navigate, BrowserRouter,useLocation } from "react-router-dom";
//
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
//Admin paenl
import Dashboard from "./scenes/dashboard";
import Layout from "./scenes/layout"
import Formations from "./scenes/formations";
import Agents from "./scenes/agents"
import Formateurs from "./scenes/formateurs"
import UpdateFormation from "./scenes/updateFormation";
import AddFormation from "./scenes/addFormation"
//Population
import Population from "./scenes/population"
import UpdatePopulation from "./scenes/updatePopulation"
//Module
import Module from "./scenes/module"
import UpdateModule from "./scenes/updateModule"

//

import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Carousel from "./components/Carousel"
//dashboard formateur
import LayoutFormateur from './components/Layout/Layout';
import DashboardFormateur from './pages/Dashboard/Dashboard';
import CalendarFormateur from './pages/Calendar/Calendar';
import BoardPageFormateur from  './pages/Board/Board';
import DataGrid from './pages/DataGrid/DataGrid';
import FormationFormateur from './pages/FormationFormateur/FormationFormateur';
import useAuth from "./components/useAuth/useAuth";
import { useEffect, useState } from "react"; // Add the useEffect and useState imports
import './style.css'
import Home from "./Home";
import Room from "./Room";
function App() {
	//Admin panel
	const mode = useSelector((state) => state.global.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	
	//
	const user = localStorage.getItem("token");

	const { state } = useLocation(); // Use the useLocation hook to access the state

  // Get the logged-in user's email from the state (passed from Login component)
  const userEmail = state && state.userEmail ? state.userEmail : "";
  const userMatricule = state && state.userMatricule ? state.userMatricule : ""; // Replace with the actual user matricule

 // Define the isAuthenticated state variable
 const [isAuthenticated, setIsAuthenticated] = useState(false);

 // Check if the user is authenticated when the component mounts
 useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }

    // Store the userEmail in localStorage
    if (userEmail) {
      localStorage.setItem("userEmail", userEmail);
    }
  }, [userEmail]);

	return (
	
		
		
			
			
		<Routes>
			   {/* Dashboard Formateur */}
			   <Route
            path="/LayoutFormateur"
            element={
              useAuth() ? (
                <LayoutFormateur userEmail={userEmail} userMatricule={userMatricule} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
				<Route path="DashboardFormateur" element={<DashboardFormateur userEmail={userEmail} />}/> 
				<Route path="FormationFormateur" element={<FormationFormateur userEmail={userEmail} userMatricule={userMatricule}/>}/> 
				
          <Route path="calendarFormateur" element={<CalendarFormateur/>}/>
          <Route path="boardFormateur" element={<BoardPageFormateur/>}/>
		  <Route path="datagrid" element={<DataGrid/>}/>
				</Route>

{/*  */}
			{user && <Route path="/" exact element={<Main />} />}
			{/* Admin Panel */}
			<Route element={<Layout/>}>
			<Route path="/panel" element={<Navigate to="/dashboard" replace />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/formations" element={<Formations />} />
			<Route path="/agents" element={<Agents />} />
			<Route path="/formateurs" element={<Formateurs />} />
			<Route path="/formations/:id" element={<UpdateFormation />} />
			<Route path="/formations/add" element={<AddFormation />} />
			{/* Population */}
			<Route path="/populations" element={<Population />} />
			<Route path="/populations/:id" element={<UpdatePopulation />} />
			{/* Module */}
			<Route path="/modules" element={<Module />} />
			<Route path="/modules/:id" element={<UpdateModule />} />

			</Route>
			{/*  */}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
			  
			{/* Video chat */}
			<Route path="/home" element={<Home />} />
			<Route path="/room/:roomID" element={<Room />} />
		</Routes>
		
	
		
	);
}

export default App;