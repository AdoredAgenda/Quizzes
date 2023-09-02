import React, { useState } from "react";
import styles from "./Leaderboard.module.css";
import Toppers from "./Toppers/Toppers";
import Item from "./Item/Item";
import Notifier from "./Notifier/Notifier";

export default function Leaderboard({
  name,
  rank,
  score,
  correct,
  show,
  changePage,
  newQuestion,
}) {
  // console.log(correct, show);
  const toppers = [
    {
      name: "Dahul",
      score: "1900",
      pos: "3",
      css: {
        clipPath: "polygon(5% 23%, 95% 0, 95% 100%, 5% 100%)",
        height: "50%",
        moveX: "-10",
      },
    },
    {
      name: "Rahul",
      score: "1900",
      pos: "1",
      css: {
        clipPath: "polygon(5% 18%, 95% 0%, 95% 100%, 5% 100%)",
        height: "80%",
        moveX: "0",
      },
    },

    {
      name: "Mahul",
      score: "1900",
      pos: "2",
      css: {
        clipPath: "polygon(5% 0, 95% 10%, 95% 100%, 5% 100%)",
        height: "60%",
        moveX: "10",
      },
    },
  ];
  let nameInit;
  name ? (nameInit = name[0].toUpperCase()) : (nameInit = "");
  return (
    <div className={styles.app}>
      <Notifier correct={correct} show={show} />
      <div className={styles.top}>
        <div className={styles.backIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
          >
            <path
              d="M12.5757 18.0622L11.4917 19.0464C11.0327 19.4631 10.2905 19.4631 9.83643 19.0464L0.344238 10.4331C-0.114746 10.0164 -0.114746 9.34254 0.344238 8.93027L9.83643 0.312526C10.2954 -0.104175 11.0376 -0.104175 11.4917 0.312526L12.5757 1.29665C13.0395 1.71779 13.0298 2.4049 12.5562 2.81717L6.67236 7.90625H20.7056C21.355 7.90625 21.8774 8.38058 21.8774 8.97016V10.3887C21.8774 10.9783 21.355 11.4526 20.7056 11.4526H6.67236L12.5562 16.5417C13.0347 16.954 13.0444 17.6411 12.5757 18.0622Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
        </div>
        <div className={styles.nameInit}>
          <span className={styles.name}>{nameInit}</span>
        </div>
      </div>
      <div className={styles.textBox}>
        <span className={styles.position}>Rank - #{rank}</span>
        <span className={styles.rank}>{score} Points</span>
      </div>
      <div className={styles.toppers}>
        {toppers.map((item) => (
          <Toppers
            name={item.name}
            score={item.score}
            pos={item.pos}
            css={item.css}
          />
        ))}
      </div>
      <div className={styles.board}>
        <Item key={"1"} name="Rahul" score="1900" serial="4" />
        <Item key={"2"} name="Mahul" score="1900" serial="5" />
        <Item key={"3"} name="Dahul" score="1900" serial="6" />
      </div>
    </div>
  );
}
