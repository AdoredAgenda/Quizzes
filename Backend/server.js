const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
// USER DEFINED MODULES
const app = require("./app");
const registerUser = require("./controllers/supFunctions/registerUser");
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
});
