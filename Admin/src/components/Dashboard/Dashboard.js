import React from "react";
import Card from "./Card/Card";
import styles from "./Dashboard.module.css";
import Participants from "./Participants/Participants";
export default function Dashboard({ list }) {
  const cards = [
    {
      title: "Participants",
      value: 230,
      colorArr: ["#F12222", "#FFDDDD"],
    },
    {
      title: "Questions",
      value: 14,
      colorArr: ["#0CC740", "#DDFFE7"],
    },
    {
      title: "Members",
      value: 20,
      colorArr: ["#6A6A6A", "#F1F1F1"],
    },
  ];
  return (
    <React.Fragment>
      <div className={styles.top}>
        {cards.map((card) => {
          return (
            <Card
              key={card.title}
              title={card.title}
              value={card.value}
              colorArr={card.colorArr}
            />
          );
        })}
      </div>
      <Participants list={list} />
    </React.Fragment>
  );
}
