import styles from "./Start.module.css";
import React from "react";
export default function Start({ socket, questionHandler }) {
  const [disabled, setDisabled] = React.useState(false);
  return (
    <div
      className={styles.button}
      onClick={(e) => {
        e.currentTarget.classList.add(styles.disabled);
        setDisabled(true);
        const data = { token: localStorage.getItem("adminJwt") };

        if (disabled) return;
        socket.emit("start", { start: true }, (response) => {
          console.log(response);
          if (response == "hello")
            alert("Now you start sending questions to the players");
          else alert("Something went wrong");
          socket.emit("fetchAllQuestions", data, (response) => {
            console.log(response.message.questions);
            response.message.questions.forEach((question) => {
              questionHandler(question.statement, question.options, "");
            });
          });
        });
      }}
    >
      <div className={styles.icon}>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.126 1.126 0 01-1.667-.985V5.653z"
          ></path>
        </svg>
      </div>
      <span className={styles.text}>Start Quiz</span>
    </div>
  );
}
