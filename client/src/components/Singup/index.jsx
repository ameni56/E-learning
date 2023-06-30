import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from '../images/logoTT.png';
import '../../../src/style.css';
import Carousel  from "../Carousel";



const Signup = () => {
  //
  const [inputs, setInputs] = useState({});
  const [activeInput, setActiveInput] = useState('');
////////////////
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    matricule: "",
    passwordConfirmation: "",
    role: "admin", // Set the default role to "admin"
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.passwordConfirmation) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError(""); // Clear the error after 2 seconds
      }, 2000);
      return;
    }
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      setTimeout(() => {
        setMsg(""); // Clear the success message after 2 seconds
      }, 3000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError(""); // Clear the error after 2 seconds
        }, 2000);
      }
    }
  };
  //
 

  const handleInputFocus = (e) => {
    setActiveInput(e.target.name);
  };

  const handleInputBlur = (e) => {
    if (!e.target.value) {
      setActiveInput('');
    }
  };
  //

  return (
	
    <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
          
    <form onSubmit={handleSubmit} autoComplete="off" >
  <div className="logo">
        <img src={logo} alt="easyclass" />
        <h4>TT ACADEMY</h4>
      </div>

      <div className="heading">
        <h2>Bienvenue</h2>
        <h6>Vous avez déjà un compte ? </h6>
        <Link to="/login" style={{ alignSelf: "flex-start" }} className="toggle">
           Se connecter
           </Link>
      </div>
      
      <div className="actual-form">
      <div className={`input-wrap ${activeInput === 'name' ? 'active' : ''}`}>
            
            <input
              type="text"
              placeholder="Nom"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="input-field"
              
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            />
            </div>
            <div className={`input-wrap ${activeInput === 'name' ? 'active' : ''}`}>
            <input
              type="text"
              placeholder="Prènom"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="input-field"
             
           onFocus={handleInputFocus}
           onBlur={handleInputBlur}
            />
            </div>
            <div className={`input-wrap ${activeInput === 'name' ? 'active' : ''}`}>
            <input
              type="text"
              placeholder="Matricule"
              name="matricule"
              onChange={handleChange}
              value={data.matricule}
              required
              className="input-field"
             
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            />
            </div>
            <div className={`input-wrap ${activeInput === 'email' ? 'active' : ''}`}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="input-field"
            
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            </div>
            <div className={`input-wrap ${activeInput === 'password' ? 'active' : ''}`}>
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="input-field"
              
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}

            />
            </div>
            <div className={`input-wrap ${activeInput === 'password' ? 'active' : ''}`}>
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              name="passwordConfirmation"
              onChange={handleChange}
              value={data.passwordConfirmation}
              required
              className="input-field"
             
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}

            />
            </div>
            {/* <div className={styles.role_container}>
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                name="role"
                value={data.role}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="admin">Admin</option>
                <option value="formateur">Formateur</option>
                <option value="agent">Agent</option>
              </select>
            </div> */}
            {error && <div className={styles.error_msg}>{error}</div>}
            
 {msg && <div className={styles.success_msg}>{msg}</div>}
            
            <button type="submit" className="sign-btn" >
              S'inscrire
            </button>
           
       </div>
       
          </form>
          </div>
          <Carousel/>
          </div>
          </div>
          
          
          
       
  );
};

export default Signup;
