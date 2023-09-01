import React, { useState, useEffect } from "react";
import styles from "./QuestionPage.module.css";

export default function QuestionPage() {
  const [time, setTime] = useState(30); // Set the initial time here (e.g., 30 seconds)
  const [question, setQuestion] = useState(1);
  const [score, setScore] = useState("000");
  const [questionStatement, setQuestionStatement] = useState(`
    Why was hitler kicked out of art school?
  `);
  const [options, setOptions] = useState([
    "So He could start world war",
    "To Kill Jews",
    "To become a dictator",
    "It was a Plot by a Time Traveler",
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timerStopped, setTimerStopped] = useState(false); // State to track if the timer is stopped
  const [submitClicked, setSubmitClicked] = useState(false); // State to track if the "Submit" button is clicked

  function touchHandler(option) {
    setSelectedOption(option);
  }

  const handleButtonClick = () => {
    setTimerStopped(true);
    setSubmitClicked(true);
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

  useEffect(() => {
    // Start the timer when the component mounts
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0 || timerStopped) {
          clearInterval(timer); // Stop the timer when it reaches zero or when timerStopped is true
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Stop the timer and handle any other cleanup when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [timerStopped]);

  return (
    <div className={styles.page}>
      <div className={`${time ? styles.hide : ""} ${styles.timeOver}`}>
        {submitClicked && (
          <span className={styles.timeOverText}>
            Waiting for Leaderboard {":)"}
          </span>
        )}
        {time === 0 && !submitClicked && (
          <span className={styles.timeOverText}>Time Over!</span>
        )}
        {time === 0 && submitClicked && (
          <span className={styles.timeOverText1}>
            Please wait for the next Question.
          </span>
        )}
      </div>
      <div className={styles.top}>
        <span className={styles.score}>{score}</span>
        <span className={styles.questionNum}>Question {question}</span>
        <span className={styles.timer}>{time} Sec</span>
      </div>
      <ProgressBar time={time} /> {/* Use ProgressBar component here */}
      <div className={styles.questionBox}>
        <span className={styles.question}>{questionStatement}</span>
      </div>
      <div className={styles.options}>
        {options.map((option, index) => {
          return (
            <div
              onTouchStart={() => touchHandler(index)}
              onClick={() => {
                setSelectedOption(index);
              }}
              className={`${styles.option} ${
                index === selectedOption ? styles.selectedOption : ""
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
          handleButtonClick();
        }}
      />
    </div>
  );
}
