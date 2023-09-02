import styles from "./Item.module.css";
export default function Item({ name, score, serial, rollNo }) {
  const nameInit = name[0].toUpperCase();
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span className={styles.serial}>{serial}</span>
        <div className={styles.nameInit}>
          <span className={styles.nameInitText}>{nameInit}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <span className={styles.name}>{name}</span>
          <span
            style={{ fontSize: "1.2rem", fontWeight: "600", marginTop: "1rem" }}
          >
            {rollNo}
          </span>
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.score}>{score}</span>
      </div>
    </div>
  );
}
