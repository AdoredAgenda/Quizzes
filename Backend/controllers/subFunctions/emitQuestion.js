const Response = require("../../utils/utilityFunctions/response");
const adminAuth = require("../subFunctions/adminAuth");
const callBack = require("../subFunctions/callBack");
const emitQuestion = async (socket, data, cb) => {
  console.log(data);
  try {
    adminAuth(data.token);
    socket.to("room1").emit("receive", { question: data.question });

    const response = new Response(
      "success",
      true,
      "dataSentSuccessfully",
      null
    );
    callBack(response, cb);
  } catch (err) {
    const response = new Response("fail", false, null, err.message);
    callBack(response, cb);
  }
};
module.exports = emitQuestion;
