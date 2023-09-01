import { io } from "socket.io-client";
const socket = io("http://localhost:3003");
// location.href = "./admin.html";
// const socket2 = io("http://localhost:3000/user", { auth: { token: "test" } });
// socket2.on("connect_error", (err) => {
//   console.log(err);
// });
const messages = document.querySelector("#messageContainer");
const send = document.querySelector("#send-button");
const join = document.querySelector("#join-button");
const message_input = document.querySelector("#message-input");
const room_input = document.querySelector("#room-input");
send.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(message_input);
  const myMessage = message_input.value;
  const rollNo = document.getElementById("roll").value;
  const data = { username: myMessage, rollNo };
  inbox(myMessage);
  socket.emit("registerUser", data, (response) => {
    console.log(response);
    localStorage.setItem("token", response.message.token);
  });
});
const inbox = (myMessage) => {
  messages.innerHTML += "<br>" + myMessage;
  message_input.value = "";
};

// socket.on("broadcast", (message) => {
//   inbox(message);
// });
socket.on("connect", () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log(token);
    const data = { token };
    socket.emit("loginUser", data, (response) => {
      console.log(response);
    });
  }
});

join.addEventListener("click", (event) => {
  event.preventDefault();
  socket.emit("join_room", room_input.value, () => {
    console.log("joined");
  });
});
// join.addEventListener();
let count = 0;
setInterval(() => {
  // console.log("fuck u");
  socket.volatile.emit("ping", count++);
}, 1000);
document.addEventListener("keydown", (e) => {
  if (e.target.matches("input")) return;
  else if (e.key === "c") socket.connect();
  else if (e.key === "d") {
    socket.disconnect();
  }
});
socket.on("broadcast", (data) => {
  console.log(data);
});
socket.on("receive", (data) => {
  console.log(data);
});
socket.on("time", (data) => {
  console.log(data.time / 1000);
});
