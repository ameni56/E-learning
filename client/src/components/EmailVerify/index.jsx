import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react/cjs/react.production.min";
import Carousel  from "../Carousel";
import logo from '../images/logoTT.png';
import '../../../src/style.css';
import Login from "../Login";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
        setMsg("Compte vérifié avec succès");
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
        }
        setValidUrl(false);
        setError("Compte déjà vérifié");
        setTimeout(() => {
          setError(""); // Clear the error message after 2 seconds
        }, 3000);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <>
          {msg && <div className={`${styles.message} ${styles.success}`}>{msg}</div>}
          <Login />
        </>
      ) : (
        <>
          {error && <div className={`${styles.message} ${styles.error}`}>{error}</div>}
          <Login />
        </>
      )}
    </Fragment>
  );
};

export default EmailVerify;
