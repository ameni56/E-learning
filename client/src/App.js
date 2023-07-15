import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
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
//
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Carousel from "./components/Carousel"
import './style.css'
function App() {
	//Admin panel
	const mode = useSelector((state) => state.global.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	
	//
	const user = localStorage.getItem("token");

	return (
	
		
		
			
			
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			{/* Admin Panel */}
			<Route element={<Layout/>}>
			<Route path="/panel" element={<Navigate to="/dashboard" replace />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/formations" element={<Formations />} />
			<Route path="/agents" element={<Agents />} />
			</Route>
			{/*  */}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
		</Routes>
		
	
		
	);
}

export default App;