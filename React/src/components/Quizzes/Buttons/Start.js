import styles from "./Start.module.css";

export default function Start() {
  return (
    <div className={styles.button}>
      <div className={styles.icon}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.126 1.126 0 01-1.667-.985V5.653z"
          ></path>
        </svg>
      </div>
      <span className={styles.text}>Start Quiz</span>
    </div>
  );
}
