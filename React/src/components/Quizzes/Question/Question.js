import styles from "./Question.module.css";
import Option from "./Option";
export default function Question({ question, serial }) {
  console.log("Question -> question", question);

  return (
    <div className={styles.box}>
      <div className={styles.left}>
        <div className={styles.serial}>
          <span className={styles.serialText}>{serial}</span>
        </div>
        <div className={styles.questionBox}>
          <span className={styles.question}>{question.question}</span>
          <div className={styles.options}>
            {question.options.map((option, index) => {
              return <Option key={index} text={option} />;
            })}
          </div>
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  );
}
