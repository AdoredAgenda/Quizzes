const Response = require("../../utils/utilityFunctions/response");
const adminAuth = require("../subFunctions/adminAuth");
const callBack = require("../subFunctions/callBack");

const fetchAllQuestions = async (socket, data, cb) => {
  try {
    adminAuth(data.token);
    const response = new Response(
      "success",
      true,
      { questions: data.questions },
      null
    );
    callBack(response, cb);
  } catch (err) {
    const response = new Response("fail", false, null, err.message);
    callBack(response, cb);
  }
};
module.exports = fetchAllQuestions;
