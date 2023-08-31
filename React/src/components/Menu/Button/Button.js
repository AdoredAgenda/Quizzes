import styles from "./Button.module.css";
export default function Button({ selected, icon, text, switchPage }) {
  const classBox = `${styles.buttonBox}`;
  return (
    <div className={classBox} onClick={() => switchPage(text)}>
      <div className={`${styles.button} ${selected ? styles.selected : ""}`}>
        <div className={`${styles.iconBox}`}>{icon}</div>
        <p className={`${styles.text}`}>{text}</p>
      </div>
    </div>
  );
}
