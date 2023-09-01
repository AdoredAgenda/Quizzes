import styles from "./Participants.module.css";
import Item from "./Item/Item";

export default function Participants({ list }) {
  return (
    <div className={styles.box}>
      <p className={styles.title}>Participants</p>
      <div className={styles.list}>
        {list.map((item) => {
          return (
            <Item
              key={item.rollNo}
              name={`${item.username}`}
              score={item.totalScore}
              roll={item.rollNo}
            />
          );
        })}
      </div>
    </div>
  );
}
