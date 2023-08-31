import styles from "./Participants.module.css";
import Item from "./Item/Item";

export default function Participants({ list }) {
  console.log(list);
  return (
    <div className={styles.box}>
      <p className={styles.title}>Participants</p>
      <div className={styles.list}>
        {list.map((item) => {
          return (
            <Item
              key={item.name}
              name={item.name}
              score={item.score}
              roll={item.roll}
            />
          );
        })}
      </div>
    </div>
  );
}
