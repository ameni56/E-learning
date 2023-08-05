import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./styles.module.css";
import logo from '../images/logoTT.png';
import '../../../src/style.css';
import Carousel from "../Carousel";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const [activeInput, setActiveInput] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  const [data, setData] = useState({ email: "", password: "", matricule: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Step 1: Add useNavigate hook

  const handleInputFocus = (e) => {
    setActiveInput(e.target.name);
  };

  const handleInputBlur = (e) => {
    if (!e.target.value) {
      setActiveInput('');
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
  
      // Assuming the server returns the user's role in the response
      const userRole = res.data.role; // Replace 'role' with the actual property name from the response
  
      if (!userRole) {
        console.error("User role is missing in the server response.");
        // Handle the case where the server response does not contain the user's role.
        // You might want to show an error message to the user or redirect to a default dashboard.
        return;
      }
  
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", userRole); // Save the user's role to local storage
  
      
      // Check the user's role and navigate to the appropriate dashboard
      if (userRole === "formateur") {
        navigate("/LayoutFormateur/FormationFormateur", { state: { userEmail: data.email,userMatricule:data.matricule } });
      } 
      
      else if (userRole === "agent") {
        navigate("/HomeAgent");}
      else if (userRole === "admin") {
        navigate("/dashboardAdmin");
      } else {
        console.error("Unknown user role:", userRole);
        // Handle the case if the user's role is not recognized.
        // You might want to show an error message to the user or redirect to a default dashboard.
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setTimeout(() => setError(""), 3000);
      } else {
        console.error("Error occurred while logging in:", error);
        // Handle other errors that might occur during login.
        // You might want to show an error message to the user.
      }
    }
  };
    return (
    <main>
    <div className="box">
    <div className="inner-box">
    {error && <div className={styles.error_msg}>{error}</div>}
      <div className="forms-wrap">
    <form onSubmit={handleSubmit} autoComplete="off" className={`sign-in-form ${showSignUp ? 'slide-out' : ''}`}>
  <div className="logo">
        <img src={logo} alt="easyclass" />
        <h4>TT Académie</h4>
      </div>
      <div className="heading">
        <h2>Bienvenue</h2>
        <h6>Pas encore inscrit ? </h6>
        
        <Link to="/signup" style={{ alignSelf: "flex-start" }} className="toggle">
           S'inscrire
           </Link>
       
      </div>
      <div className="actual-form">
        <div className={`input-wrap ${activeInput === 'name' ? 'active' : ''}`}>
          <input
            type="text"
            name="matricule"
            placeholder="Matricule"
            className="input-field"
            autoComplete="off"
            required
            onChange={handleChange}
            value={data.matricule}
          
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
         
        </div>
        <div className={`input-wrap ${activeInput === 'email' ? 'active' : ''}`}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            autoComplete="off"
            required
            onChange={handleChange}
            value={data.email}
          
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          </div>
          <div className={`input-wrap ${activeInput === 'password' ? 'active' : ''}`}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Mot de passe"
    name="password"
    minLength="4"
    className="input-field"
    autoComplete="off"
    required
    onChange={handleChange}
    value={data.password}
    onFocus={handleInputFocus}
    onBlur={handleInputBlur}
  />
  <div
    className={styles.password_toggle}
    onClick={togglePasswordVisibility}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
</div>

<button type="submit" className="sign-btn">
  Se connecter
</button>
<Link to="/forgot-password" style={{ alignSelf: "flex-start" }} className="toggle">
  <p style={{ padding: "0 1px" }}>Mot de passe oublié ?</p>
</Link>
      </div>


   


</form>
</div>
<Carousel/>
</div>
</div>
</main>
  );
};

export default Login;
