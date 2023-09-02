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
        // setTempData(action.data);
        setMessage(action.message);
        setScore(action.score);
        return state - 1;
      case "two":
        return state + 2;
      default:
        return state;
    }
  }
  // const [time, setTime] = useState(30);
  // const [tempData, setTempData] = useState([{}]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [page, dispatch] = useReducer(changePage, 1);
  const [loggedIn, setLoggedIn] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [response, setResponse] = useState(null);
  const [newQuestion, setNewQuestion] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([{}]);

  const [myData, setMyData] = useState({
    rank: 0,
    totalScore: 0,
    username: "",
  });
  function responseHandler(newRes) {
    setResponse(newRes);
    console.log(newRes);
    setWasCorrect(newRes.message.wasCorrect);
    setShowBoard(true);
  }
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
    let newSocket = io("https://quizbackend-ks0n.onrender.com");
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
    newSocket.on("checkYourRank", (response) => {
      console.log("checkYourResult");
      console.log(response);
      if (response.sendReq) {
        const token = localStorage.getItem("token");
        const data = { token };
        newSocket.emit("myRank", data, (newRes) => {
          console.log(newRes);
          dispatch({ type: "next" });
          dispatch({ type: "next" });
          console.log(newRes.message);
          setMyData(newRes.message.user);
        });
      }
    });
    newSocket.on("receive", (data) => {
      setNewQuestion((prev) => !prev);
      setData((prev) => {
        return {
          ...prev,
          time: data.time,
          question: data.question,
        };
      });
      console.log(data);
    });
    newSocket.on("time", (data) => {
      setData((prev) => {
        return {
          ...prev,
          time: data.time / 1000,
        };
      });
    });

    newSocket.on("sendLeaderboardData", (response) => {
      // let { newLeadBoa } = response.data;
      let newLeadBoa = response.leaderBoardData;
      setLeaderboardData(newLeadBoa);
    });
    return () => newSocket.close();
  }, []);
  useEffect(() => {
    if (page === 3) {
      dispatch({ type: "next" });
    } else if (page === 5) {
      dispatch({ type: "prev" });
    }
  }, [newQuestion]);
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
      jsx: <Login key="login" socket={socket} changePage={dispatch} />,
    },
    {
      name: "Waiting",
      page: 3,
      jsx: (
        <Waiting
          key="waiting"
          message={message}
          score={score}
          changePage={dispatch}
          newQuestion={newQuestion}
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
          responseHandler={responseHandler}
        />
      ),
    },
    {
      name: "Leaderboard",
      page: 5,
      jsx: (
        <Leaderboard
          key="leaderboard"
          name={myData.username}
          changePage={dispatch}
          correct={wasCorrect}
          show={showBoard}
          rank={myData.rank}
          score={myData.totalScore}
          newQuestion={newQuestion}
          leaderboardData={leaderboardData}
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
