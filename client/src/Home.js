import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import conf from "../src/assets/video_conference.jpg";
import Navbar from "./components/NavbarMeet";
import logo from "../src/assets/logoTT.png";

const Home = () => {
  const [RoomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const submitCode = (e) => {
    e.preventDefault();

    // Regular expression to check if the code contains both letters and numbers
    const codePattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;

    if (!codePattern.test(RoomCode)) {
      // If the code doesn't meet the requirements, display an error message or handle it as you prefer
      alert("Code must be at least 6 characters long and contain both letters and numbers.");
      return;
    }

    // If the code is valid, navigate to the specified room
    navigate(`/room/${RoomCode}`);
  };

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      backgroundImage: `url(${conf})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      /* Add any other styles you want for the background */
    },
    homeContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    hero: {
      position: "relative",
      height: "100vh",
    },
    image: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    heroContent: {
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "8rem",
    },
    mainText: {
      fontSize: "50px",
      "@media (min-width: 768px)": {
        fontSize: "80px",
      },
      color: "white",
      fontWeight: "bold",
      paddingTop: "12px",
    },
    subText: {
      fontSize: "26px",
      "@media (min-width: 768px)": {
        fontSize: "32px",
      },
      color: "white",
      marginTop: "-2px",
    },
    form: {
      paddingTop: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      padding: "10px 16px",
      borderRadius: "9999px",
      maxWidth: "14rem",
      width: "100%",
      marginTop: "12px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      outline: "none",
    },
    button: {
      backgroundColor: "#00a0ff",
      color: "white",
      fontSize: "1rem",
      fontWeight: "bold",
      padding: "5px 16px",
      borderRadius: "9999px",
      width: "10rem",
      marginTop: "12px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#0089e0",
      },
    },
  };

  return (
    <div style={styles.body}>
      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <div style={styles.hero}>
        {/* Image */}
        <div style={styles.image}>
          <img src={conf} alt="Conference" style={styles.image} />
        </div>
        {/* Overlay */}
        <div style={styles.overlay}></div>
        {/* Hero Info */}
        <div style={{ ...styles.heroContent, maxWidth: "90vw", margin: "0 auto" }}>
          {/* Main */}
          <div style={styles.mainText}>
            Visioconférence
          </div>
          <p style={styles.subText}>Avec TT ACADEMY</p>
          {/* Enter Code */}
          <form onSubmit={submitCode} style={styles.form}>
            <label style={{ ...styles.mainText, paddingTop: "24px" }}></label>
            <input
              type="text"
              required
              placeholder="Entrer un code ici"
              value={RoomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Commencer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
