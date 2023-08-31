import styles from "./Item.module.css";
export default function Item({ name, score, roll }) {
  console.log("Item -> name", name);
  console.log("Item -> score", score);
  console.log("Item -> roll", roll);
  const nameInitialLetter = name[0].toUpperCase();

  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div className={styles.icon}>
          <span className={styles.iconText}>{nameInitialLetter}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span className={styles.roll}>{roll}</span>
        </div>
      </div>
      <span className={styles.score}>{`${score} Points`}</span>
    </div>
  );
}
