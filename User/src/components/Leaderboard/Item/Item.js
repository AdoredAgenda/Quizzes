import styles from "./Item.module.css";
export default function Item({ name, score, serial }) {
  const nameInit = name[0].toUpperCase();
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span className={styles.serial}>{serial}</span>
        <div className={styles.nameInit}>
          <span className={styles.nameInitText}>{nameInit}</span>
        </div>
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.right}>
        <span className={styles.score}>{score}</span>
      </div>
    </div>
  );
}
