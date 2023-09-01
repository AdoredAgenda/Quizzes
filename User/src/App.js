import styles from "./App.module.css";
import { useEffect, useState, useReducer } from "react";
import Welcome from "./components/Welcome/Welcome";
import Login from "./components/Login/Login";
import Waiting from "./components/Waiting/Waiting";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import Leaderboard from "./components/Leaderboard/Leaderboard";
function App() {
  let userData = {
    name: "Arnav",
    rollNo: "",
    score: 0,
  };
  //change page reducer
  const changePage = (state, action) => {
    console.log(state, action);
    switch (action.type) {
      case "next":
        return state + 1;
      case "prev":
        return state - 1;
      default:
        return state;
    }
  };
  const [page, dispatch] = useReducer(changePage, 1);
  let pages = [
    {
      name: "Welcome",
      page: 1,
      jsx: (
        <Welcome
          changePage={(type) => {
            dispatch({ type: type });
          }}
          key="welcome"
        />
      ),
    },
    {
      name: "Login",
      page: 2,
      jsx: (
        <Login
          key="login"
          changePage={(type) => {
            dispatch({ type: type });
          }}
        />
      ),
    },
    {
      name: "Waiting",
      page: 3,
      jsx: (
        <Waiting
          key="waiting"
          changePage={(type) => {
            dispatch({ type: type });
          }}
        />
      ),
    },
    {
      name: "QuestionPage",
      page: 4,
      jsx: (
        <QuestionPage
          key="questionPage"
          changePage={(type) => {
            dispatch({ type: type });
          }}
        />
      ),
    },
    {
      name: "Leaderboard",
      page: 5,
      jsx: (
        <Leaderboard
          key="leaderboard"
          name={userData.name}
          changePage={(type) => {
            dispatch({ type: type });
          }}
        />
      ),
    },
  ];

  // useEffect(() => {
  //   let token;
  //   if (localStorage.get("token") === null) {
  //     //fetch request here
  //     //save token in token
  //     localStorage.setItem("token", token);
  //   } else {
  //     //fetch userData
  //     //save userData in userData
  //     // like score, name, roll no, etc
  //   }
  // }, []);

  return (
    <div className={styles.App}>
      {pages.map((item) => {
        if (page === item.page) {
          return item.jsx;
        }
      })}
    </div>
  );
}

export default App;
