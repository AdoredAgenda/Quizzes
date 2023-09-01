const mongoose = require("mongoose");
const userSchama = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  rollNo: { type: String, required: true },
  role: {
    type: String,
    default: "user",
  },
  totalScore: {
    type: Number,
    default: 0,
  },
  rank: { type: Number, default: 0 },
});

module.exports = mongoose.model("users", userSchama);
