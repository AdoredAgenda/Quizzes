import React, { useState, useEffect } from "react";
import styles from "./QuestionPage.module.css";

export default function QuestionPage({ socket, data, changePage }) {
  const [score, setScore] = useState("000");

  const [timerStopped, setTimerStopped] = useState(false); // State to track if the timer is stopped
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false); // State to track if the "Submit" button is clicked
  const [curScore, setCurScore] = useState(500);
  useEffect(() => {
    console.log(data.time);
    if (data.time === 1) {
      console.log("Time Over");
      changePage({ type: "prev" });
      setTimerStopped(true);
    }
  }, [data.time]);
  function submitHandler() {
    const token = localStorage.getItem("token");
    setCurScore(Math.floor((data.time / 30) * 500));
    const data1 = {
      token,
      answer: selectedOption,
      score: curScore,
    };
    socket.emit("submitAnswer", data1, (response) => {
      console.log(response);
    });
  }
  // socket.on("checkYourResult", (data) => {
  //   if (data.sendReq) {
  //     const jwt = localStorage.getItem("token");
  //     socket.emit("myRank", jwt, (data1) => {
  //       console.log(data1);
  //     });
  //   }
  // });
  const handleButtonClick = () => {
    setSubmitClicked(true);
    submitHandler();
  };

  // Define the ProgressBar component here
  function ProgressBar({ time }) {
    const calculateHSL = (timeLeft) => {
      const hue = Math.floor(120 * (timeLeft / 30)); // Adjusted calculation for color transition
      return `hsl(${hue}, 100%, 50%)`;
    };

    return (
      <div className={styles.progress}>
        <div
          className={styles.progressBar}
          style={{
            backgroundColor: calculateHSL(time),
            width: `${(time / 30) * 100}%`, // Adjust the width based on time
          }}
        ></div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={`${data.time ? styles.hide : ""} ${styles.timeOver}`}>
        {submitClicked && (
          <span className={styles.timeOverText}>
            Waiting for Leaderboard {":)"}
          </span>
        )}
        {data.tiem === 1 && !submitClicked && (
          <span className={styles.timeOverText}>Time Over!</span>
        )}
        {(data.time === 1 || timerStopped || submitClicked) && (
          <span className={styles.timeOverText1}>
            Please wait for the next Question.
          </span>
        )}
      </div>
      <div className={styles.top}>
        <span className={styles.score}>{score}</span>
        <span className={styles.questionNum}>Question {1}</span>
        <span className={styles.timer}>{data.time} Sec</span>
      </div>
      <ProgressBar time={data.time} /> {/* Use ProgressBar component here */}
      <div className={styles.questionBox}>
        <span className={styles.question}>{data.question.statement}</span>
      </div>
      <div className={styles.options}>
        {data.question.options.map((option, index) => {
          return (
            <div
              onTouchStart={() => setSelectedOption(option)}
              onClick={() => {
                setSelectedOption(option);
              }}
              className={`${styles.option} ${
                option === selectedOption ? styles.selectedOption : ""
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
        disabled={selectedOption === null ? true : false}
        onClick={() => {
          changePage({ type: "prev" });
          handleButtonClick();
        }}
        onTouchStart={() => {
          changePage({ type: "prev" });
          handleButtonClick();
        }}
      />
    </div>
  );
}
