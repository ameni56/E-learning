import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./styles.module.css";
import logo from '../images/logoTT.png';
import '../../../src/style.css';
import Carousel  from "../Carousel";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const [activeInput, setActiveInput] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);
  
  const [data, setData] = useState({ email: "", password: "", matricule: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 
  
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
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="box">
    <div className="inner-box">
      <div className="forms-wrap">
    <form onSubmit={handleSubmit} autoComplete="off" className={`sign-in-form ${showSignUp ? 'slide-out' : ''}`}>
  <div className="logo">
        <img src={logo} alt="easyclass" />
        <h4>TT ACADEMY</h4>
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
{error && <div className={styles.error_msg}>{error}</div>}
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
  );
};

export default Login;
