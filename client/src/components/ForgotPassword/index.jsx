import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from '../images/logoTT.png';
import '../../../src/style.css';
import Carousel  from "../Carousel";

const ForgotPassword = () => {
	 //
	 const [inputs, setInputs] = useState({});
	 const [activeInput, setActiveInput] = useState('');
   ////////////////
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  const url = `http://localhost:8080/api/password-reset`;
		  const { data } = await axios.post(url, { email });
		  setMsg(data.message);
		  setError("");
		  setTimeout(() => {
			setMsg(""); // Clear the success message after 3 seconds
		  }, 3000);
		} catch (error) {
		  if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status <= 500
		  ) {
			setError(error.response.data.message);
			setTimeout(() => setError(""), 3000);
			setMsg("");
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
		{error && <div className={styles.error_msg}>{error}</div>}
				{msg && <div className={styles.success_msg}>{msg}</div>}
          <div className="forms-wrap">
<form onSubmit={handleSubmit} autoComplete="off" >
  <div className="logo">
        <img src={logo} alt="easyclass" />
        <h4>TT Académie</h4>
      </div>

      <div className="heading">
	  <h6>Vous avez déjà un compte ? </h6>
		<Link to="/login" style={{ alignSelf: "flex-start" }} className="toggle">
           Se connecter
           </Link>
        <h3>Réinitialiser votre compte</h3>
	
      </div>
      
      <div className="actual-form">
      <div className={`input-wrap ${activeInput === 'email' ? 'active' : ''}`} >
            
            <input
              type="email"
			  placeholder="Email"
			  name="email"
			  onChange={(e) => setEmail(e.target.value)}
			  value={email}
			  required
              className="input-field"
              
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            />
            </div>
    



		
				
				
				<button type="submit" className="sign-btn">
					Envoyer
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

export default ForgotPassword;