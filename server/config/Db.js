const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose
    .connect(
      "mongodb+srv://lokeshkatari921:aI09VQyUrAm78tQS@cluster0.uhgrpv4.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log(" DB connection successfull ");
    });
};
module.exports = connectToMongo;
