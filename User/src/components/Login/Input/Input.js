import styles from "./Input.module.css";
import { useState } from "react";
export default function Input({ placeholder, value, changeHandler }) {
  const [val, setVal] = useState(value);
  const handleChange = (e) => {
    setVal(e.target.value);
    changeHandler(e.target.value);
  };
  return (
    <div className={styles.input}>
      <span
        className={`${styles.placeholder} ${
          val.length > 0 ? styles.movedPlaceholder : ""
        }`}
      >
        {placeholder}
      </span>
      <input
        type="text"
        className={styles.inputBox}
        value={val}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
