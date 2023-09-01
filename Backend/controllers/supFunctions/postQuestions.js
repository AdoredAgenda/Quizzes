const questionSchema = require("../../models/questionSchema");
const Response = require("../../utils/utilityFunctions/response");
const adminAuth = require("../subFunctions/adminAuth");
const callBack = require("../subFunctions/callBack");

const postQuestions = async (socket, data, cb) => {
  try {
    adminAuth(data.token);
    await questionSchema.create({
      statement: data.question.statement,
      options: data.question.options,
      answer: data.question.answer,
    });
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
module.exports = postQuestions;
