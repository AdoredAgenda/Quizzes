import styles from "./App.module.css";
import { useEffect, useState, useReducer } from "react";
import Welcome from "./components/Welcome/Welcome";
import Login from "./components/Login/Login";
import Waiting from "./components/Waiting/Waiting";
import QuestionPage from "./components/QuestionPage/QuestionPage";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import io from "socket.io-client";

export default function App() {
  function changePage(state, action) {
    console.log(state, action);
    switch (action.type) {
      case "next":
        return state + 1;
      case "prev":
        return state - 1;
      case "two":
        return state + 2;
      default:
        return state;
    }
  }

  const [socket, setSocket] = useState(null);
  const [page, dispatch] = useReducer(changePage, 1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState({
    time: null,
    question: null,
  });
  let [userData, setUserData] = useState({
    name: "Arnav",
    rollNo: "",
    score: 0,
  });
  useEffect(() => {
    let newSocket = io("http://192.168.141.180:3003");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("connected");
      const token = localStorage.getItem("token");
      if (token) {
        const data = { token };
        newSocket.emit("loginUser", data, (response) => {
          if (response.success) {
            dispatch({ type: "two" });
            setUserData({
              name: response.message.user.username,
              rollNo: response.message.user.rollNo,
            });
            // setLoggedIn(true);
          }
        });
      }
    });
    newSocket.on("receive", (data) => {
      dispatch({ type: "next" });
      setData((prev) => {
        return {
          ...prev,
          time: data.time,
          question: data.question,
        };
      });
    });
    newSocket.on("time", (data) => {
      setData((prev) => {
        return {
          ...prev,
          time: data.time / 1000,
        };
      });
    });
    return () => newSocket.close();
  }, []);

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
          socket={socket}
          key="questionPage"
          data={data}
          changePage={dispatch}
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
          changePage={dispatch}
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
