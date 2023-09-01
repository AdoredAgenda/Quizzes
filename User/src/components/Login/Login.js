import React, { useState } from "react";
import img from "../../Assets/Login.png";
import Input from "./Input/Input";
import styles from "./Login.module.css";

export default function Login({ changePage, socket }) {
  console.log(socket);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [nameTest, setNameTest] = useState(false);
  const [rollTest, setRollTest] = useState(false);
  function rollNoRegex(roll) {
    if (roll.length == 8) {
      const regex = /^23[A-Za-z]{3}(0[0-9][1-9]|1[0-4][0-9]|150)$/;
      if (regex.test(roll)) {
        console.log("Valid Roll No.");
        setRollTest(true);
      } else {
        alert("Invalid Roll No.");
        console.log("Invalid Roll No.");
        setRollTest(false);
      }
    } else {
      console.log("Checking Roll No.");
      setRollTest(true);
    }
  }
  function rollHandler(roll) {
    setRoll(roll);
    rollNoRegex(roll);
  }
  function nameHandler(name) {
    setName(name);
    if (name.length > 0) {
      setNameTest(true);
    }
  }
  return (
    <React.Fragment>
      <div className={styles.header}>
        <img src={img} alt="Google Logo" />
      </div>
      <div className={styles.main}>
        <span className={styles.heading}>Just One More Step</span>
        <Input
          placeholder="Name"
          key={"name"}
          value={name}
          changeHandler={nameHandler}
        />
        <Input
          placeholder="Roll No."
          key={"roll"}
          value={roll}
          changeHandler={rollHandler}
        />
        <input
          type="button"
          className={styles.button}
          value="Submit"
          onClick={() => {
            const data = {
              username: name,
              rollNo: roll,
            };
            socket.emit("registerUser", data, (response) => {
              console.log(response);
              localStorage.setItem("token", response.message.token);
              if (response.success) changePage("next");
              else alert(response.errMessage);
            });
          }}
          disabled={nameTest && rollTest && roll.length === 8 ? false : true}
        />
      </div>
    </React.Fragment>
  );
}
