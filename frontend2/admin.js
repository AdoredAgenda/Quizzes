import { io } from "socket.io-client";
const submit = document.querySelector("button");
const password = document.querySelector(".password");
const username = document.querySelector(".username");
const socket = io("http://localhost:3000");
// console.log(socket);
socket.on("connect", () => {
  const token = localStorage.getItem("adminJwt");
  if (token) {
    console.log(token);
    const data = { token };
    socket.emit("verifyAdmin", data, (response) => {
      console.log(response);
    });
  }
});
submit.addEventListener("click", () => {
  socket.emit(
    "loginAdmin",
    { username: username.value, password: password.value },
    (response) => {
      console.log(response);
      localStorage.setItem("adminJwt", response.message.adminJwt);
    }
  );
});
document.querySelector(".start").addEventListener("click", () => {
  const data = { start: true };
  socket.emit("start", data, (response) => {
    console.log(response);
  });
});
document.querySelector(".insertQuestion").addEventListener("click", () => {
  const statement = document.querySelector(".question").value;
  const options = document.querySelector(".options").value.split(",");
  const answer = document.querySelector(".answer").value;
  const token = localStorage.getItem("adminJwt");
  socket.emit(
    "postQuestion",
    {
      token,
      question: {
        statement,
        options,
        answer,
      },
    },
    (response) => {
      console.log(response);
    }
  );
});
document.querySelector(".transmit").addEventListener("click", () => {
  const questionNo = document.querySelector(".questionTransmit").value;
  const token = localStorage.getItem("adminJwt");
  const data = { token, questionNo };
  socket.emit("emitQuestion", data, (response) => {
    console.log(response);
  });
});
