const leaderboardSchema = require("../../models/leaderboardSchema");
const Response = require("../../utils/utilityFunctions/response");
const callBack = require("../subFunctions/callBack");

const sendLeaderboardData = async () => {
  try {
    const leaderboardData = await leaderboardSchema.find({});
    const leaderboard = leaderboardData[0].leaderboard;
    const response = new Response("success", true, { data: leaderboard }, null);
    callBack(response, cb);
  } catch (err) {
    const response = Response("fail", false, null, err.message);
    callBack(response, cb);
  }
};
module.exports = sendLeaderboardData;
