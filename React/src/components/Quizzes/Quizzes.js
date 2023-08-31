import styles from "./Quizzes.module.css";
import Start from "./Buttons/Start";
import AddQuestion from "./Buttons/AddQuestion";
import React from "react";
import Question from "./Question/Question";
export default function Quizzes({ questions }) {
  return (
    <React.Fragment>
      <div className={styles.buttons}>
        <Start />
        <AddQuestion />
      </div>
      <div className={styles.questionBox}>
        <p className={styles.heading}>Questions</p>
        <div className={styles.list}>
          {questions.map((question, index) => {
            return (
              <Question key={index} serial={index + 1} question={question} />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
