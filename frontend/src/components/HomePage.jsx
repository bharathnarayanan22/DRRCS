import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useSelector } from "react-redux";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const handleButtonClick = () => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 style={{fontSize: "280%", marginBottom: "20px", color:"black"}}>
          <TypeAnimation
            sequence={[
              "Disaster Relief Resource Coordination System",
              1000,
              "Coordinating Resources for Disaster Relief",
              2000,
              "Disaster Relief Resource Coordination System",
              1500,
            ]}
            speed={50}
            repeat={Infinity}
            className="type-animation"
          />
        </h1>
        <p>
          Streamline disaster relief efforts by matching resources and
          volunteers with those in need. Get real-time updates, track resources,
          and coordinate volunteers effectively.
        </p>
        <button onClick={handleButtonClick} className={styles.registerButton}>
          Join the Relief Effort
        </button>
      </div>
      <div className={styles.rightSide}>
        <img src="/src/assets/2.jpg" alt="Disaster Relief" />
      </div>
    </div>
  );
};

export default HomePage;
