const mongoose = require("mongoose");
const questionSchema = mongoose.Schema({
  statement: {},
  options: [{ type: String }],
  answer: {
    type: String,
  },
});

module.exports = mongoose.model("questions", questionSchema);
