import styles from "./Popup.module.css";
import Input from "./Input";
import { useState } from "react";

export default function Popup({ popUpHandler, questionHandler }) {
  const [options, setOptions] = useState(["", ""]);
  const [question, setQuestion] = useState("");

  function addOption() {
    setOptions([...options, ""]);
  }
  function editOption(newText, index) {
    let newOptions = [...options];
    newOptions[index] = newText;
    setOptions(newOptions);
    console.log("Popup -> newOptions", newOptions);
  }
  function editQuestion(newText) {
    setQuestion(newText);
  }
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.top}>
          <span className={styles.heading}>Add Question</span>
          <div
            className={styles.closeIcon}
            onClick={() => {
              popUpHandler();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className={styles.content}>
          <Input
            label="Question"
            type="text"
            val={question}
            editOption={editQuestion}
            ind={0}
          />
          <div className={styles.optionBox}>
            <span className={styles.heading}>Options</span>
            {options.map((option, index) => {
              return (
                <Input
                  key={index}
                  label={`Option ${index + 1}`}
                  type="text"
                  editOption={editOption}
                  ind={index}
                />
              );
            })}
            <input
              type="button"
              value="Add Option"
              className={styles.addOption}
              onClick={() => addOption()}
            />
          </div>
        </div>
        <input
          type="button"
          value="Sumbit"
          className={styles.submit}
          onClick={() => {
            questionHandler(question, options);
            popUpHandler();
          }}
        />
      </div>
    </div>
  );
}
