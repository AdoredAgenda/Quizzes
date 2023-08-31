import styles from "./Input.module.css";
import { useState } from "react";

export default function Input({ label, val, type, editOption, ind }) {
  const [value, setValue] = useState(val);
  const [inputClass, setInputClass] = useState("");
  const [labelClass, setLabelClass] = useState("");
  const [inputBoxClass, setInputBoxClass] = useState("");

  function focus() {
    setInputClass(styles.inputFocus);
  }
  function blur() {
    setInputClass("");
    if (value.length) {
      setLabelClass(styles.labelFocus);
    } else {
      setLabelClass("");
    }
  }
  function changeHandler(e) {
    setValue(e.target.value);
    editOption(e.target.value, ind);
    if (e.target.value.length > 0) {
      setLabelClass(styles.labelFocus);
    } else {
      setLabelClass("");
    }
  }
  return (
    <div
      className={`${styles.input} ${inputClass}`}
      onFocus={(e) => focus(e)}
      onBlur={(e) => blur(e)}
    >
      <label className={`${styles.label} ${labelClass}`}>{label}</label>
      <input
        type={type}
        value={value}
        className={`${styles.inputBox} ${inputBoxClass}`}
        onChange={(e) => changeHandler(e)}
      />
    </div>
  );
}
