const amqp = require("amqplib");
const Submission = require("../Models/SubmissionModel");
const Question = require("../Models/CodeQuestionSchema");
const {
  nodejsCompiler,
  pythonCompiler,
} = require("../containers/compilerimages");
const { OutputSeperator } = require("./TestCaseSeperator");
const { solutionJudge } = require("./solutionJudge");
const { generateTestCasesinJS } = require("../TemplateGenerator/jsGenerator");
const {
  generateTestCasesforPython,
} = require("../TemplateGenerator/PythonGenerator");
const mongoose = require("mongoose");
// mongodb://127.0.0.1:27017/Online-Code-Judge
const connectToMongo = () => {
  mongoose
    .connect(
      "mongodb+srv://lokeshkatari921:aI09VQyUrAm78tQS@cluster0.uhgrpv4.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log(" DB connection successfull ");
    });
};
async function rcp2() {
  connectToMongo();
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queue = "codeSubmit";
  // channel.prefetch(1);
  await channel.assertQueue(queue);
  console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

  channel.consume(queue, async (msg) => {
    console.log("mesg consumed");
    let message = msg.content.toString();
    message = JSON.parse(message);
    console.log(message);
    let language = message.language;
    let processId = message.processId;
    let code = message.code;
    let subCode = message.code;
    let hiddenOutputs = message.hiddenOutputs;
    let totalOutputs = message.totalOutputs;
    let hiddenTestCases = message.hiddenTestCases;
    let userId = message.userId;
    let SubmittedAt = message.submittedAt;
    let proTitle = message.proTitle;
    let answer = true;
    let P_id = message.P_id;
    let isCorrect = false;
    let i = 3;
    try {
      if (language === "javascript") {
        let hiddenTestCasesTemplate = generateTestCasesinJS(
          hiddenTestCases,
          proTitle,
          hiddenOutputs,
          i
        );
        let formatcode = JSON.stringify(hiddenTestCasesTemplate);
        code += formatcode;
        let { output, isError, executionTime } = await nodejsCompiler(code);

        output = output.replace(/\u001b\[\d{1,2}m/g, "");
        let testCases = OutputSeperator(output, language);
        let passedCases = solutionJudge(totalOutputs, testCases);
        answer = passedCases.length === 5 ? true : false;
        if (isError) {
          await Submission.create({
            user: userId,
            result: {
              msg: "Execution error",
              output: output,
              SubmittedAt: SubmittedAt,
              testCases: passedCases,
              codeSubmitted: subCode,
              executionTime: executionTime,
              answer: "Execution error",
              title: proTitle,
              P_id: P_id,
            },
            processId: processId,
          });
        } else {
          isCorrect = answer;
          console.log("hey ", passedCases);
          await Submission.create({
            user: userId,
            result: {
              msg: "success",
              output: output,
              SubmittedAt: SubmittedAt,
              testCases: passedCases,
              codeSubmitted: subCode,
              executionTime: executionTime,
              language: language,
              answer: answer,
              title: proTitle,
              P_id: P_id,
            },
            processId: processId,
          });
        }
      }
      if (language === "python") {
        let hiddenTestCasesTemplate = generateTestCasesforPython(
          hiddenTestCases,
          proTitle,
          hiddenOutputs,
          i
        );
        let formatcode = JSON.stringify(hiddenTestCasesTemplate);
        code += formatcode;
        // console.log(code);
        let { output, isError, executionTime } = await pythonCompiler(code);
        // output = output.replace(/\u001b\[\d{1,2}m/g, '');
        output = output.replace(/[\u0000-\u0008\u000b\u000E-\u001F]/g, "");
        // console.log(output);
        let testCases = OutputSeperator(output, language);
        let passedCases = solutionJudge(totalOutputs, testCases);
        answer = passedCases.length === 5 ? "Correct" : "Wrong";
        console.log("hey ", passedCases);
        if (isError) {
          await Submission.create({
            user: userId,
            result: {
              msg: "Execution error",
              output: output,
              SubmittedAt: SubmittedAt,
              testCases: passedCases,
              codeSubmitted: subCode,
              executionTime: executionTime,
              language: language,
              answer: "Execution error",
              title: proTitle,
              P_id: P_id,
            },
            processId: processId,
          });
        } else {
          // console.log("hey ", passedCases);
          isCorrect = answer;
          await Submission.create({
            user: userId,
            result: {
              msg: "success",
              output: output,
              SubmittedAt: SubmittedAt,
              testCases: passedCases,
              codeSubmitted: subCode,
              executionTime: executionTime,
              language: language,
              answer: answer,
              title: proTitle,
              P_id: P_id,
            },
            processId: processId,
          });
          if (testCases.length == 5) {
          }
        }
      }
      const update = isCorrect
        ? { $inc: { "Submissions.Correct": 1 } }
        : { $inc: { "Submissions.Wrong": 1 } };
      console.log(update);
      await Question.findByIdAndUpdate(P_id, update);
    } catch (error) {
      console.log(error);
    }

    channel.ack(msg);
  });
}

rcp2().catch(console.error);
