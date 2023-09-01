import styles from "./Welcome.module.css";
import img from "../../Assets/Home.png";
import Heading from "./Heading/Heading";
import React, { useState } from "react";

export default function Welcome({ changePage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const data = [
    {
      heading: "GDSC",
      text: "Welcome to GDSC Opening Event for First year",
      page: 1,
    },
    {
      heading: "Interesting Quiz",
      text: "Play quizzes with your friends and get various prizes",
      page: 2,
    },
    {
      heading: "Prizes",
      text: "Get a chance to win exciting prizes and swags from Google",
      page: 3,
    },
  ];
  return (
    <React.Fragment>
      <div className={styles.header}>
        <img src={img} alt="Google Logo" />
      </div>
      <div className={styles.main}>
        <Heading
          heading={data[currentPage - 1].heading}
          text={data[currentPage - 1].text}
        />
        <div className={styles.pages}>
          {data.map((item) => (
            <div
              className={
                currentPage === item.page
                  ? styles.page + " " + styles.active
                  : styles.page
              }
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              onTouchStart={() => setCurrentPage(item.page)}
              onTouchEnd={() => setCurrentPage(item.page)}
            ></div>
          ))}
        </div>
        <div className={styles.button} onTouchStart={() => changePage("next")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.9428 5.72385C16.4221 5.20315 15.5779 5.20315 15.0572 5.72385C14.5365 6.24455 14.5365 7.08877 15.0572 7.60947L22.1144 14.6667H6.66668C5.9303 14.6667 5.33334 15.2636 5.33334 16C5.33334 16.7364 5.9303 17.3333 6.66668 17.3333H22.1144L15.0572 24.3905C14.5365 24.9112 14.5365 25.7554 15.0572 26.2761C15.5779 26.7968 16.4221 26.7968 16.9428 26.2761L26.2752 16.9438C26.2784 16.9405 26.2816 16.9373 26.2848 16.9341C26.5201 16.6944 26.6656 16.3662 26.6667 16.004C26.6667 16.0027 26.6667 16.0013 26.6667 16C26.6667 15.9987 26.6667 15.9973 26.6667 15.996C26.6661 15.8167 26.6302 15.6457 26.5655 15.4896C26.5019 15.3359 26.4084 15.1917 26.2848 15.0659C26.2817 15.0627 26.2785 15.0595 26.2753 15.0564M26.2753 15.0564L16.9428 5.72385L26.2753 15.0564Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </React.Fragment>
  );
}
