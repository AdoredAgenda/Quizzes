import logo from "./logo.svg";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import Dashboard from "./components/Dashboard/Dashboard";
import Menu from "./components/Menu/Menu";
import Quizzes from "./components/Quizzes/Quizzes";
import React, { useState } from "react";
import Participants from "./components/Dashboard/Participants/Participants";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Login from "./components/Login/Login";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (localStorage.getItem("user") === "LoggedIn") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);
  const [page, setPage] = React.useState("Dashboard");
  const [loggedIn, setLoggedIn] = React.useState(false);
  function loginHandler(status) {
    setLoggedIn(status);
  }
  let currentPage = [
    {
      name: "Dashboard",
      selected: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
            fill="#8E8E93"
          />
        </svg>
      ),
    },
    {
      name: "Participants",
      selected: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z"
            fill="#8E8E93"
          />
        </svg>
      ),
    },
    {
      name: "Leaderboard",
      selected: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"
            fill="#8E8E93"
          />
        </svg>
      ),
    },
    {
      name: "Quizzes",
      selected: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 2.25V8.00625H6.00937L6 8.01562L9.99844 12L6 15.9938L6.00937 16.0031H6V21.75H18V16.0031H17.9906L18 15.9938L14.0016 12L18 8.01562L17.9906 8.00625H18V2.25H6ZM15.9984 16.4953V19.8469H8.00156V16.4953L12 12.5016L15.9984 16.4953ZM12 11.5031L8.00156 7.50937V4.10625H16.0031V7.50469L12 11.5031Z"
            fill="#8E8E93"
          />
        </svg>
      ),
    },
  ];
  let list = [
    { name: "Arnav Chhabra", score: 500, roll: "22bcs024" },
    {
      name: "Sam",
      score: 100,
      roll: "22bcs029",
    },
    {
      name: "Zman",
      score: 200,
      roll: "22bcs020",
    },
    {
      name: "Sahil",
      score: 235,
      roll: "22bcs021",
    },
  ];
  let [questions, setQuestions] = useState([
    {
      question: "What is your species?",
      options: ["Human", "Alien", "Robot", "None of the above"],
      correctOption: "Alien",
      points: 500,
    },
    {
      question: "When did first world war start?",
      options: ["1914", "1915", "1916", "1917"],
      correctOption: "1914",
      points: 100,
    },
    {
      question: "Who is the president of India?",
      options: [
        "Narendra Modi",
        "Ram Nath Kovind",
        "Amit Shah",
        "Rahul Gandhi",
      ],
      correctOption: "Ram Nath Kovind",
      points: 200,
    },
    {
      question: "Who found America?",
      options: [
        "Christopher Columbus",
        "Vasco da Gama",
        "Vikings",
        "None of the above",
      ],
      correctOption: "Christopher Columbus",
      points: 235,
    },
    {
      question: "When did world uprise start?",
      options: ["1914", "1915", "1916", "1917"],
      correctOption: "1914",
      points: 500,
    },
  ]);

  function questionHandler(newQuestion, options, correctOption) {
    const newQuest = {
      question: newQuestion,
      options: options,
      points: 500,
      correctOption: correctOption,
    };
    console.log("App -> newQuest", newQuest);
    setQuestions([...questions, newQuest]);
  }
  function switchPage(pageName) {
    setPage(pageName);
  }
  return (
    <div className={styles.App}>
      {" "}
      {!loggedIn ? (
        <Login loginHandler={loginHandler} />
      ) : (
        <React.Fragment>
          <Nav loginHandler={loginHandler} />
          <div className={styles.conatiner}>
            <Menu
              currentPage={currentPage}
              page={page}
              switchPage={switchPage}
            />
            <div className={styles.box}>
              {
                {
                  Dashboard: <Dashboard list={list} />,
                  Participants: <Participants list={list} />,
                  Leaderboard: <Leaderboard list={list} />,
                  Quizzes: (
                    <Quizzes
                      questions={questions}
                      questionHandler={questionHandler}
                    />
                  ),
                }[page]
              }
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
