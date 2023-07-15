import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from '../images/logoTT.png';
import '../../../src/style.css';
import Carousel  from "../Carousel";
import {useForm} from "react-hook-form"


const Signup = () => {
  //
 const {register,formState:{errors},handleSubmit,}=useForm();
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
    role: [], 
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "role") {
      let role = '';
      if (checked) {
        role = value;
      }
      setData({ ...data, role });
    } else {
      setData({ ...data, [name]: value });
    }
  };
  
  
  
  

  const onSubmit = async (e) => {
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
    <main>
	
    <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
          
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
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
              // required
              className="input-field"
              
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...register("firstName",{required:true})}
            />
            <p>{errors.firstName && "Nom est obligatoire"}</p>
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
              // required
              className="input-field"
            
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              {...register("email",{required:true,pattern:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i})}
            />
            <error>{errors.email?.type === "required" && "Email est obligatoire"}</error>
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
            <div style={{ alignSelf: "flex-start" }} className="toggleposte">
              Quelle est votre poste ?
             </div>
            <div className={`input-wrap ${styles.checkboxContainer}`}>
             
  <input
    type="checkbox"
    name="role"
    value="agent"
    checked={data.role.includes("agent")}
    onChange={handleChange}
    className={styles.checkbox}
  />
  Agent
 
 


  
  <input
    type="checkbox"
    name="role"
    value="formateur"
    checked={data.role.includes("formateur")}
    onChange={handleChange}
    className={styles.checkbox}
  />
  Formateur

</div>

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
          
          
          
          </main>
  );
};

export default Signup;
