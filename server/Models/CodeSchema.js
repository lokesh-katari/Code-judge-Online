const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const code = mongoose.model("code", codeSchema);
module.exports = code;
