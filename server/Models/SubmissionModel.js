const mongoose = require("mongoose");

const Submissions = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  result: {
    P_id: {
      type: mongoose.Schema.ObjectId,
      ref: "codeQue",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
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
    codeSubmitted: {
      type: String,
      required: true,
    },
    executionTime: {
      type: Number,
      // required: true,
    },
    language: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  processId: {
    type: String,
    required: true,
  },
});

const Submission = mongoose.model("Submission", Submissions);
module.exports = Submission;
