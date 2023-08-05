import { useState ,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from '../images/logoTT.png';
import '../../../src/style.css';
import Carousel  from "../Carousel";
import {useForm} from "react-hook-form"
import { useGetPopulationsQuery } from "../../state/api"; // Replace "path/to/api" with the actual path to api.js

import Select from 'react-select'; // Import the regular Select component

const Signup = () => {
  // Inline CSS styles for the custom dropdown
  const dropdownStyles = {
    width: "200px", // Adjust the width here as needed
    position: "relative",
    marginTop: "-25px", // Add the desired marginTop value here
   
  };
  
  const selectedOptionStyles = {
    padding: "4px 10px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "13px",
    cursor: "pointer",
   
  };
  
  const dropdownContentStyles = {
    position: "absolute",
    top: "auto", // Change this to "auto" to display the options on top
    bottom: "100%", // Change this to "100%" to display the options on top
    left: 0,
    width: "100%",
    maxHeight: "200px",
    overflowY: "auto",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 999,
  };
  
  const dropdownOptionStyles = {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  };
  //
 // Add a loading state to handle the loading of populationsData
 const [loading, setLoading] = useState(true);
 const [showDropdown, setShowDropdown] = useState(false);
 const [selectedDomain, setSelectedDomain] = useState('');

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
    populationCible: null, // Changed to null as we want to select one population
  });

 // Use local state to store the options for the population select
 const [populationOptions, setPopulationOptions] = useState([]);
  
 // Fetch available populations using the API with useEffect
 const { data: populationsData, isLoading } = useGetPopulationsQuery();
 
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
  
  
  
  useEffect(() => {
    // Once the populationsData is available, convert it to options format
    if (populationsData) {
      const options = populationsData.map(population => ({
        value: population._id,
        label: population.nom
      }));
      setPopulationOptions(options);
    }
  }, [populationsData]);
  
 
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
  const handlePopulationChange = (selectedPopulation) => {
    const populationCible = selectedPopulation ? [selectedPopulation.value] : []; // Extract the value from the selected population object
    setData({ ...data, populationCible });
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

 
  const handleSelectOption = (option) => {
    const selectedValue = option ? option.label : '';
    setData({ ...data, populationCible: option ? [option.value] : [] });
    setSelectedDomain(selectedValue);
    setShowDropdown(false);
  };
  
  return (
    <main>
	
 
    <div className="box">
        <div className="inner-box">
        {error && <div className={styles.error_msg}>{error}</div>}
            
            {msg && <div className={styles.success_msg}>{msg}</div>}
          <div className="forms-wrap">
         
    <form onSubmit={onSubmit} autoComplete="off" >
  <div className="logo">
        <img src={logo} alt="easyclass" />
        <h4>TT Académie</h4>
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
              // required
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
            <div style={{ alignSelf: "flex-start" ,marginTop:"-20px"}} className="toggleposte">
              Choisissez votre poste :
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
<div className="input-wrap">
        <div style={{ alignSelf: "flex-start", marginTop: "-20px" }} className="toggleposte">
          Choisissez votre domaine :
        </div>
        <div className="custom-dropdown" style={dropdownStyles}>
          <div
            className="selected-option"
            style={selectedOptionStyles}
            onClick={handleToggleDropdown}
          >
          <div className="selected-option" style={selectedOptionStyles} onClick={handleToggleDropdown}>
  Domaine: {selectedDomain}
</div>
          </div>
          {showDropdown && (
            <div className="dropdown-content" style={dropdownContentStyles}>
              {populationOptions.map((option) => (
                <div
                  key={option.value}
                  className="dropdown-option"
                  style={dropdownOptionStyles}
                  onClick={() => handleSelectOption(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
            <button type="submit" className="sign-btn"style={{ marginTop: "20px" }} >
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
