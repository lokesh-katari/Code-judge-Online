const mongoose = require("mongoose");

const Submissions = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  result: {
    msg: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    SubmittedAt: {
      type: Date,
      required: true,
    },
    testCases: {
      type: Array,
    },
  },
  processId: {
    type: String,
    required: true,
  },
});

const Submission = mongoose.model("Submission", Submissions);
module.exports = Submission;
