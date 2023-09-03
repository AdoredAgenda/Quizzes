const Response = require("../../utils/utilityFunctions/response");
const adminAuth = require("../subFunctions/adminAuth");
const callBack = require("../subFunctions/callBack");
const sendQuestion = async (socket, data, cb) => {
  console.log(data);
  try {
    adminAuth(data.token);
    if (!data.hasEventStarted) {
      throw new Error("eventHasNotStartedYet");
    } else if (data.islastQuestionInProcess) {
      throw new Error("lastQuestionInProcess");
    } else {
      socket
        .to("room1")
        .emit("receive", {
          question: data.question,
          questionNo: data.questionNo,
        });

      const response = new Response(
        "success",
        true,
        "dataSentSuccessfully",
        null
      );
      callBack(response, cb);
    }
  } catch (err) {
    const response = new Response("fail", false, null, err.message);
    callBack(response, cb);
  }
};
module.exports = sendQuestion;
