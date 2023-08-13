const mongoose = require("mongoose");

const codeQueUpload = new mongoose.Schema({
  template: [
    {
      language: {
        type: String,
        required: true,
      },
      codeTemplate: {
        type: String,
        required: true,
      },
    },
  ],
  ProblemTitle: {
    type: String,
    required: true,
  },
  ProblemDesc: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  DifficultyLevel: {
    type: String,
  },
  output: {
    type: Array,
    required: true,
  },
  hiddenOutputs: {
    type: Array,
    required: true,
  },
  hiddenTestCases: [
    {
      name: {
        type: Array,
      },
      values: {
        type: Array,
      },
    },
  ],
});

const codeQue = mongoose.model("codeQue", codeQueUpload);
module.exports = codeQue;
