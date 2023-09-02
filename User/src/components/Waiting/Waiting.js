import React, { useState } from "react";
import styles from "./Waiting.module.css";
import img from "../../Assets/bg2.png";
import clock from "../../Assets/Clock.svg";

export default function Waiting(props) {
  return (
    <React.Fragment>
      <div className={styles.img}>
        <img src={img} alt="Google Logo" />
      </div>
      <div className={styles.background}>
        <div className={styles.icon}>
          <img src={clock} alt="Clock" />
        </div>

        {/* <span className={styles.heading}>{props.score ? props.score : ""}</span> */}
        <span className={`${styles.score} ${styles.top}`}>
          {props.message || "Please Wait for the event to Start..."}
        </span>
      </div>
    </React.Fragment>
  );
}
