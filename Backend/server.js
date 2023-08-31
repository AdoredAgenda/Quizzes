const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
dotenv.config({ path: "./.env" });

const ip = process.env.IP || "127.0.0.1";
const port = process.env.PORT || 3000;

const DB = process.env.DATABASE_STRING.replace(
  "<PASSWORD>",
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
  console.log(socket.id);
});
