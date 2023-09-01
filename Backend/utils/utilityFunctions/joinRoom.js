const joinRoom = (socket) => {
  socket.join("room1");
  console.log("room joined");
};
module.exports = joinRoom;
