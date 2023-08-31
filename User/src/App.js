import styles from "./App.module.css";
import { useEffect } from "react";
import img from "./Assets/Illustration.png";
function App() {
  let userData = {
    name: "",
    rollNo: "",
    score: 0,
  };
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
      <div className={styles.header}>
        <img src={img} alt="Google Logo" />
      </div>
      <div className={styles.main}>
        <span className={styles.heading}>Interesting QUIZ Awaits You</span>
        <span className={styles.text}>
          play quizzes with your friends and get various prizes
        </span>
      </div>
    </div>
  );
}

export default App;
