import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import logo from '../images/logoTT.png';
import '../../../src/style.css';
import Carousel  from "../Carousel";
import Login from "../Login";

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `http://localhost:8080/api/password-reset/${param.id}/${param.token}`;
	 //
	 const [inputs, setInputs] = useState({});
	 const [activeInput, setActiveInput] = useState('');

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  const { data } = await axios.post(url, { password });
		  setMsg(data.message);
		  setError("");
		  setTimeout(() => {
			setMsg(""); // Clear the success message after 3 seconds
		  }, 3000);
		  window.location = "/login";
		} catch (error) {
		  if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status <= 500
		  ) {
			setError("Mot de passe déjà changé");
			setMsg("");
			setTimeout(() => {
			  setError(""); // Clear the error message after 3 seconds
			}, 3000);
		  }
		}
	  };
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
		<Fragment>
			{validUrl ? (
				   
				 <div className="box">
				 <div className="inner-box">
				   <div className="forms-wrap">
				   
			 <form onSubmit={handleSubmit} autoComplete="off" >
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
     			 <div className={`input-wrap ${activeInput === 'password' ? 'active' : ''}`}>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className="input-field"
              
            	onFocus={handleInputFocus}
            	onBlur={handleInputBlur}
						/>
						 </div>
						 
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type="submit"  className="sign-btn" >
							Submit
						</button>
						</div>
			</form>
			</div>
			<Carousel/>
			</div>
			</div>
				
			) : (
				<>
				{error && <div className={`${styles.message} ${styles.error}`}>{error}</div>}
				<Login />
			  </>
			)}
			
		</Fragment>
		</main>
	);
};

export default PasswordReset;