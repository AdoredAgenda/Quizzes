const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
let questions = [];
let hasEventStarted = false;
let islastQuestionInProcess = false;
let time = 30000;
// USER DEFINED MODULES
const app = require("./app");
const registerUser = require("./controllers/supFunctions/registerUser");
const loginUser = require("./controllers/supFunctions/loginUser");
const loginAdmin = require("./controllers/supFunctions/loginAdmin");
const verifyAdmin = require("./controllers/supFunctions/verifyAdmin");
const postQuestions = require("./controllers/supFunctions/postQuestions");
const questionSchema = require("./models/questionSchema");
const sendQuestion = require("./controllers/supFunctions/sendQuestion");
const { clearInterval } = require("timers");
// const callBack = require("./controllers/callBack");
dotenv.config({ path: "./.env" });

const ip = process.env.IP || "127.0.0.1";
const port = process.env.PORT || 3000;

const DB = process.env.DATABASE_STRING.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);
mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err.message);
  });
const server = http.createServer(app);
server.listen(port, ip, () => {
  console.log(`Server running at http://${ip}:${port}/`);
});
const io = require("socket.io")(server, { cors: "*" });
io.on("connect", (socket) => {
  socket.on("registerUser", (data, cb) => {
    registerUser(socket, data, cb);
  });
  socket.on("loginAdmin", (data, cb) => {
    loginAdmin(socket, data, cb);
  });
  socket.on("verifyAdmin", (data, cb) => {
    verifyAdmin(socket, data, cb);
  });
  socket.on("loginUser", (data, cb) => {
    loginUser(socket, data, cb);
  });
  socket.on("start", async (data, cb) => {
    hasEventStarted = true;
    questions = await questionSchema.find(
      {},
      { statement: true, options: true, _id: false }
    );
    socket.to("room1").emit("broadcast", data);
    cb("hello");
  });
  socket.on("postQuestion", (data, cb) => {
    postQuestions(socket, data, cb);
  });
  socket.on("emitQuestion", (data, cb) => {
    data["question"] = questions[data.questionNo * 1];
    data["hasEventStarted"] = hasEventStarted;
    data["islastQuestionInProcess"] = islastQuestionInProcess;
    sendQuestion(socket, data, cb);
    if (!islastQuestionInProcess && hasEventStarted) {
      const timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          time = 30000;
          islastQuestionInProcess = false;
        } else {
          const data = { time };
          socket.to("room1").emit("time", data);
          time -= 1000;
        }
      }, 1000);
    }
    islastQuestionInProcess = true;
  });
  socket.on("submitAnswer");
});
