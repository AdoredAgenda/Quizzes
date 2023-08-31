import styles from "./Card.module.css";

export default function Card({ colorArr, title, value }) {
  const [textColor, backgroundColor] = colorArr;
  return (
    <div className={styles.card}>
      <div className={styles.empty}></div>
      <span className={styles.value}>{value}</span>
      <div
        className={styles.titleBox}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <span
          className={styles.title}
          style={{
            color: textColor,
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
