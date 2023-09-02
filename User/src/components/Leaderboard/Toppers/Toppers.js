import styles from "./Toppers.module.css";

export default function Toppers({ name, score, css, pos, rollNo }) {
  console.log(name, score, css, pos);
  const nameInit = name[0].toUpperCase();

  return (
    <div className={`${styles.third} ${styles.topperItem}`}>
      <div
        className={styles.nameInit}
        style={{
          transform: `translate(${css.moveX}%, 1.2rem)`,
          marginBottom: pos === 1 ? "1.2rem" : "0",
        }}
      >
        <span className={styles.nameInitText}>{nameInit}</span>
      </div>
      <span className={`${styles.point} ${styles.gap}`}>{rollNo}</span>

      <div
        className={`${styles.infoBox}`}
        style={{
          clipPath: css.clipPath,
          height: css.height,
        }}
      >
        <span className={styles.pos}>{pos}</span>
        <span className={styles.point}>{score}</span>
        <span className={styles.points}>{"points"}</span>
      </div>
    </div>
  );
}
