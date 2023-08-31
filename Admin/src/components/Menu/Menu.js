import styles from "./Menu.module.css";
import Button from "./Button/Button";
export default function Menu({ currentPage, page, switchPage }) {
  console.log("Menu -> currentPage", currentPage);
  console.log("Menu -> page", page);
  return (
    <div className={styles.box}>
      {currentPage.map((item) => {
        return (
          <Button
            key={item.name}
            selected={item.name === page}
            icon={item.icon}
            text={item.name}
            switchPage={switchPage}
          />
        );
      })}
    </div>
  );
}
