import styles from "./Notifier.module.css";
import { useEffect, useState } from "react";
export default function Notifier(props) {
  const correctClass = props.correct ? styles.correct : styles.wrong;
  const [show, setShow] = useState(props.show ? styles.show : "");
  //remove show class after 10 seconds
  useEffect(() => {
    if (show === styles.show) {
      setTimeout(() => {
        setShow("");
      }, 10000);
    }
  });
  return (
    <div
      className={`${styles.notifier} ${correctClass} ${show}`}
      onClick={() => {
        setShow("");
      }}
      onTouchStart={
        props.show
          ? () => {
              setShow("");
            }
          : () => {}
      }
    >
      <span className={styles.text}>Your selected option was: </span>
      <span className={styles.option}>
        {props.correct ? "Correct" : "Wrong"}
      </span>
    </div>
  );
}
