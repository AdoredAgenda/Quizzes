const mongoose = require("mongoose");
const userSchama = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  rollNo: { type: String, required: true },
});
module.exports = mongoose.model("users", userSchama);
