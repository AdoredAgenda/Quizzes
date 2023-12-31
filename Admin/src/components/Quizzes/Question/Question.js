import styles from "./Question.module.css";
import Option from "./Option";
export default function Question({ question, serial, socket }) {
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
      <div className={styles.right}>
        <span className={styles.score}>{question.points} Points</span>
        <div
          className={styles.sendQuestion}
          onClick={() => {
            const questionNum = serial - 1;
            const token = localStorage.getItem("adminJwt");
            const data = {
              questionNo: questionNum,
              token: token,
            };
            socket.emit("emitQuestion", data, (response) => {
              console.log(response);
            });
          }}
        >
          <span className={styles.sendQuestionText}>Transmit</span>
        </div>
      </div>
    </div>
  );
}
