import React from "react";
import styles from "./Waiting.module.css";
import img from "../../Assets/bg2.png";
import clock from "../../Assets/Clock.svg";

export default function Waiting({ changePage }) {
  return (
    <React.Fragment>
      <div className={styles.img}>
        <img src={img} alt="Google Logo" />
      </div>
      <div className={styles.background}>
        <div className={styles.icon}>
          <img src={clock} alt="Clock" />
        </div>
        <span className={styles.heading}>Please Wait...</span>
      </div>
    </React.Fragment>
  );
}
