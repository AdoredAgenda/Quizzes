const mongoose = require("mongoose");
const leaderboardSchema = mongoose.Schema({
  leaderboard: {
    type: [
      {
        username: {
          type: String,
        },
        rollNo: {
          type: String,
        },
        totalScore: { type: Number },
        rank: {
          type: Number,
        },
      },
    ],
  },
});
module.exports = mongoose.model("leaderboard", leaderboardSchema);
