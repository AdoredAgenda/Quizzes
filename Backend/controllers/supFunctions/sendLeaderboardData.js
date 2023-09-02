const leaderboardSchema = require("../../models/leaderboardSchema");
const Response = require("../../utils/utilityFunctions/response");
const callBack = require("../subFunctions/callBack");

const sendLeaderboardData = async (socket, data, cb) => {
  try {
    const leaderboardData = await leaderboardSchema.find({});
    const leaderboard = leaderboardData[0].leaderboard;
    // console.log(`////////////////////////////////`, leaderboard);
    return leaderboard;
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = sendLeaderboardData;
