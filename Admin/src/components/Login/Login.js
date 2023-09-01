import styles from "./Login.module.css";
import image from "../../Assets/login.png";
import React from "react";
import { useState, useEffect } from "react";

export default function Login({ loginHandler, socket }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function userHandler(e) {
    setUser(e.target.value);
  }
  function passHandler(e) {
    setPass(e.target.value);
  }
  function login() {
    // if (user === "admin" && pass === "admin") {
    //   localStorage.setItem("user", "LoggedIn");
    //   loginHandler(true);
    // } else {
    //   alert("Invalid Credentials");
    //   loginHandler(false);
    // }
    socket.emit(
      "loginAdmin",
      { username: user, password: pass },
      (response) => {
        console.log(response);
        if (response.status === "success") {
          loginHandler(true);
          localStorage.setItem("adminJwt", response.message.adminJwt);
          localStorage.setItem("user", "LoggedIn");
        } else {
          localStorage.removeItem("adminJwt");
          localStorage.removeItem("user");
          alert(response.errMessage);
          loginHandler(false);
        }
      }
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <img src={image} alt="login" className={styles.image} />
      </div>
      <div className={styles.left}>
        <div className={`${styles.prop} ${styles.prop1}`}></div>
        <div className={`${styles.prop} ${styles.prop2}`}></div>
        <div className={`${styles.prop} ${styles.prop3}`}></div>
        <div className={`${styles.prop} ${styles.prop4}`}></div>
        <div className={styles.inputs}>
          <span className={styles.heading}>Sign In</span>
          <span className={styles.context}>
            Please enter the following details to continue
          </span>
          <div className={styles.inputFeilds}>
            <div className={styles.inputBox}>
              <div className={styles.inputIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    fill="#1C1C1C"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Username"
                className={styles.input}
                onChange={(e) => userHandler(e)}
              />
            </div>
            <div className={styles.inputBox}>
              <div className={styles.inputIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                >
                  <path
                    d="M5.78027 7.67924V6.83018C5.78027 4.01665 7.99424 1.73584 10.7253 1.73584C13.4564 1.73584 15.6704 4.01665 15.6704 6.83018V7.67924H17.3187C17.7739 7.67924 18.1429 8.05938 18.1429 8.52829V18.717C18.1429 19.1859 17.7739 19.566 17.3187 19.566H4.13192C3.67674 19.566 3.30774 19.1859 3.30774 18.717V8.52829C3.30774 8.05938 3.67674 7.67924 4.13192 7.67924H5.78027ZM16.4946 9.37735H4.95609V17.8679H16.4946V9.37735ZM9.90115 14.2445C9.40845 13.9509 9.07697 13.4021 9.07697 12.7736C9.07697 11.8357 9.81494 11.0755 10.7253 11.0755C11.6357 11.0755 12.3737 11.8357 12.3737 12.7736C12.3737 13.4021 12.0422 13.9509 11.5495 14.2445V16.1698H9.90115V14.2445ZM7.42862 7.67924H14.022V6.83018C14.022 4.95449 12.546 3.43395 10.7253 3.43395C8.9046 3.43395 7.42862 4.95449 7.42862 6.83018V7.67924Z"
                    fill="#1C1C1C"
                  />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                onChange={(e) => passHandler(e)}
              />
            </div>
          </div>
          <input
            type="button"
            value="Sign In"
            className={styles.submit}
            onClick={() => {
              login();
            }}
          />
        </div>
      </div>
    </div>
  );
}
