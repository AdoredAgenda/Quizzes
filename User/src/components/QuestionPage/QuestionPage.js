import React, { useReducer, useEffect, useState } from "react";
import styles from "./QuestionPage.module.css"; // Import your CSS styles here

export default function QuestionPage({ socket, data, changePage }) {
  const initialState = {
    score: "000",
    timerStopped: false,
    selectedOption: null,
    submitClicked: false,
    curScore: 500,
    message: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "score":
        return { ...state, score: action.payload };
      case "timerStopped":
        return { ...state, timerStopped: action.payload };
      case "selectedOption":
        return { ...state, selectedOption: action.payload };
      case "submitClicked":
        return { ...state, submitClicked: action.payload };
      case "curScore":
        return { ...state, curScore: action.payload };
      case "message":
        return { ...state, message: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [hasTouchOccurred, setHasTouchOccurred] = useState(false);

  useEffect(() => {
    if (data.time === 1) {
      console.log("Time Over");
      if (!state.message) {
        // Check if message is not already set
        dispatch({ type: "message", payload: `Time's Up :(` });
      }
      changePage({ type: "prev", score: 0 });
      dispatch({ type: "timerStopped", payload: true });
    }
    dispatch({ type: "curScore", payload: Math.floor((data.time / 30) * 500) });
  }, [data.time, state.message, changePage]);

  const submitHandler = () => {
    if (!hasTouchOccurred) {
      setHasTouchOccurred(true);
      dispatch({ type: "submitClicked", payload: true });
      const token = localStorage.getItem("token");
      const data1 = {
        token,
        answer: state.selectedOption,
        score: Math.floor((data.time / 30) * 500),
      };
      socket.emit("submitAnswer", data1, (response) => {
        console.log(response);
        response.message.wasCorrect
          ? dispatch({ type: "score", payload: data1.score })
          : dispatch({ type: "score", payload: 0 });
        changePage({
          type: "prev",
          message: "Let's wait for others to finish",
          score: state.curScore,
        });
      });
    }
  };

  // Define the ProgressBar component here
  function ProgressBar({ time }) {
    const calculateHSL = (timeLeft) => {
      const hue = Math.floor(120 * (timeLeft / 30));
      return `hsl(${hue}, 100%, 50%)`;
    };

    return (
      <div className={styles.progress}>
        <div
          className={styles.progressBar}
          style={{
            backgroundColor: calculateHSL(time),
            width: `${(time / 30) * 100}%`,
          }}
        ></div>
      </div>
    );
  }

  return (
    data.question.statement && (
      <div className={styles.page}>
        <div className={`${data.time ? styles.hide : ""} ${styles.timeOver}`}>
          {state.submitClicked && (
            <span className={styles.timeOverText}>
              Waiting for Leaderboard {":)"}
            </span>
          )}
          {data.tiem === 1 && !state.submitClicked && (
            <span className={styles.timeOverText}>Time Over!</span>
          )}
          {(data.time === 1 || state.timerStopped || state.submitClicked) && (
            <span className={styles.timeOverText1}>
              Please wait for the next Question.
            </span>
          )}
        </div>
        <div className={styles.top}>
          <span className={styles.score}>{state.curScore}</span>
          <span className={styles.questionNum}>Question {1}</span>
          <span className={styles.timer}>{data.time} Sec</span>
        </div>
        <ProgressBar time={data.time} />
        <div className={styles.questionBox}>
          <span className={styles.question}>{data.question.statement}</span>
        </div>
        <div className={styles.options}>
          {data.question.options.map((option, index) => {
            return (
              <div
                onTouchStart={() => {
                  dispatch({ type: "selectedOption", payload: option });
                }}
                onClick={() => {
                  dispatch({ type: "selectedOption", payload: option });
                }}
                className={`${styles.option} ${
                  option === state.selectedOption ? styles.selectedOption : ""
                }`}
                key={index}
              >
                <span className={styles.optionText}>{option}</span>
              </div>
            );
          })}
        </div>
        <input
          type="button"
          value={"Submit"}
          className={styles.button}
          disabled={state.selectedOption === null ? true : false}
          onClick={() => {
            submitHandler();
          }}
          onTouchStart={() => {
            submitHandler();
          }}
        />
      </div>
    )
  );
}
