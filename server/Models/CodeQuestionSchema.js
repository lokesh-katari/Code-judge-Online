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
});

const codeQue = mongoose.model("codeQue", codeQueUpload);
module.exports = codeQue;
