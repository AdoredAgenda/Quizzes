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
      <label
        htmlFor="MyItem"
        onClick={(e) => {
          e.preventDefault();
          e.currentTarget.parentElement.children[1].focus();
        }}
        className={`${styles.placeholder} ${
          val.length > 0 ? styles.movedPlaceholder : ""
        }`}
      >
        {placeholder}
      </label>
      <input
        name="myItem"
        type="text"
        className={styles.inputBox}
        value={val}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
