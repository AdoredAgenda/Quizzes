import styles from "./Option.module.css";
export default function Option({ text }) {
  return (
    <div className={styles.option}>
      <span className={styles.optionText}>{text}</span>
    </div>
  );
}
