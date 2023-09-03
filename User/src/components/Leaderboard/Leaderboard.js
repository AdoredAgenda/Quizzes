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
  leaderboardData,
}) {
  console.log(leaderboardData);

  let toppersData = [
    {
      pos: "3",
      css: {
        clipPath: "polygon(5% 23%, 95% 0, 95% 100%, 5% 100%)",
        height: "50%",
        moveX: "-10",
      },
    },
    {
      pos: "1",
      css: {
        clipPath: "polygon(5% 18%, 95% 0%, 95% 100%, 5% 100%)",
        height: "80%",
        moveX: "0",
      },
    },
    {
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
        <div className={styles.nameInit}>
          <span className={styles.name}>{nameInit ? nameInit : null}</span>
        </div>
      </div>
      <div className={styles.textBox}>
        <span className={styles.position}>Rank - #{rank ? rank : null}</span>
        <span className={styles.rank}>{score ? score : null} Points</span>
      </div>
      <div className={styles.toppers}>
        {console.log(leaderboardData)}
        {leaderboardData.length >= 1 && (
          <Toppers
            name={leaderboardData[2].username}
            score={leaderboardData[2].totalScore}
            pos={toppersData[0].pos}
            css={toppersData[0].css}
            rollNo={leaderboardData[2].rollNo}
          />
        )}
        {leaderboardData.length >= 2 && (
          <Toppers
            name={leaderboardData[0].username}
            score={leaderboardData[0].totalScore}
            pos={toppersData[1].pos}
            css={toppersData[1].css}
            rollNo={leaderboardData[0].rollNo}
          />
        )}
        {leaderboardData.length >= 3 && (
          <Toppers
            name={leaderboardData[1].username}
            score={leaderboardData[1].totalScore}
            pos={toppersData[2].pos}
            css={toppersData[2].css}
            rollNo={leaderboardData[1].rollNo}
          />
        )}
      </div>
      <div className={styles.board}>
        {leaderboardData.length >= 4 &&
          leaderboardData.map((item, ind) => {
            if ((ind > 2) & (ind < 10)) {
              return (
                <Item
                  key={ind}
                  name={item.username}
                  score={item.totalScore}
                  serial={ind + 1}
                  rollNo={item.rollNo}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
