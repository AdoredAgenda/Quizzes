import styles from "./App.module.css";
import { useEffect, useState, useReducer } from "react";
import Welcome from "./components/Welcome/Welcome";
import Login from "./components/Login/Login";
import Waiting from "./components/Waiting/Waiting";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import io from "socket.io-client";

export default function App() {
  const changePage = (state, action) => {
    switch (action.type) {
      case "next":
        return state + 1;
      case "prev":
        return state - 1;
      default:
        return state;
    }
  };

  const [socket, setSocket] = useState(null);
  const [page, dispatch] = useReducer(changePage, 1);
  const [loggedIn, setLoggedIn] = useState(false);
  let [userData, setUserData] = useState({
    name: "Arnav",
    rollNo: "",
    score: 0,
  });
  useEffect(() => {
    console.log("useEffect");
    console.log(page);

    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    if (!loggedIn)
      newSocket.on("connect", () => {
        const token = localStorage.getItem("token");
        if (token) {
          const data = { token };
          console.log(data);
          newSocket.emit("loginUser", data, (response) => {
            if (response.success) {
              dispatch({ type: "next" });
              setUserData({
                name: response.message.user.username,
                rollNo: response.message.user.rollNo,
              });
              setLoggedIn(true);
            }
          });
        }
      });
    newSocket.on("broadcast", (data) => {
      if (data.start) dispatch({ type: "next" });
    });
  }, []);

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
          socket={socket}
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
