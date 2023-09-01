import React from "react";
import styles from "./Heading.module.css";

export default function Heading({ heading, text }) {
  return (
    <React.Fragment>
      <span className={styles.heading}>{heading}</span>
      <span className={styles.text}>{text}</span>
    </React.Fragment>
  );
}
