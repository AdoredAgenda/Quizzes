const userSchema = require("../../models/userSchema");
const verifyJWT = require("../../utils/security/verifyJwt");
const Response = require("../../utils/utilityFunctions/response");
const callBack = require("../subFunctions/callBack");

const checkAnswer = async (socket, data, cb) => {
  const payload = verifyJWT(process.env.USER_JWT_SECRET, data.token);

  let wasCorrect = false;
  const user = await userSchema.findOne({ rollNo: payload.rollNo });
  if (data.thisQuestionData.answer === data.answer) {
    wasCorrect = true;
    console.log("------------------------------------", user);
    await userSchema.updateOne(
      { rollNo: payload.rollNo },
      { $set: { totalScore: user.totalScore + data.score } }
    );
  } else {
    data.score = 0;
  }
  const response = new Response("success", true, {
    yourScore: user.totalScore + data.score,
    wasCorrect: wasCorrect,
  });
  callBack(response, cb);
};
module.exports = checkAnswer;
