import styles from "./Popup.module.css";
import Input from "./Input";
import React, { useState } from "react";

export default function Popup({ popUpHandler, questionHandler, socket }) {
  const [options, setOptions] = useState(["", ""]);
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState(null);

  function addOption() {
    setOptions([...options, ""]);
  }
  function correctHandler(e) {
    setCorrect(() => {
      return e.target.value;
    });
  }
  function insertQuest(statement, options, answer) {
    const token = localStorage.getItem("adminJwt");
    socket.emit(
      "postQuestion",
      {
        token,
        question: {
          statement,
          options,
          answer,
        },
      },
      (response) => {
        if (response.success) alert(response.message);
        else alert(response.errMessage);
      }
    );
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
          <div className={styles.correct}>
            <span className={styles.heading}>Correct Answer</span>
            <div className={styles.radio}>
              {options.map((option, index) => {
                return (
                  <div className={styles.rad}>
                    <input
                      onClick={(e) => correctHandler(e)}
                      type="radio"
                      key={index}
                      id={`option${index + 1}`}
                      name="correct"
                      value={option}
                    />
                    <label for={`option${index + 1}`} className={styles.label}>
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <input
          type="button"
          value="Sumbit"
          className={styles.submit}
          onClick={() => {
            insertQuest(question, options, correct);
            questionHandler(question, options, correct);
            popUpHandler();
          }}
        />
      </div>
    </div>
  );
}
