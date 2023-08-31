import styles from "./Quizzes.module.css";
import Start from "./Buttons/Start";
import AddQuestion from "./Buttons/AddQuestion";
import React from "react";
import Question from "./Question/Question";
import Popup from "./Popup/Popup";

export default function Quizzes({ questions, questionHandler }) {
  const [showPopup, setShowPopup] = React.useState(false);
  function togglePopup() {
    setShowPopup(!showPopup);
  }
  return (
    <React.Fragment>
      {showPopup && (
        <Popup popUpHandler={togglePopup} questionHandler={questionHandler} />
      )}
      <div className={styles.buttons}>
        <Start />
        <AddQuestion popUpHandler={togglePopup} />
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
