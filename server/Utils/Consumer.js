const amqp = require("amqplib");
const {
  nodejsCompiler,
  pythonCompiler,
} = require("../containers/compilerimages");
const { OutputSeperator } = require("./TestCaseSeperator");
const { solutionJudge } = require("./solutionJudge");
async function rcp() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queue = "codeTest";
  channel.prefetch(1);
  await channel.assertQueue(queue);
  console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

  channel.consume(queue, async (msg) => {
    let message = msg.content.toString();
    message = JSON.parse(message);
    // console.log(message);
    const language = message.language;
    const code = message.code;
    const actualOutput = message.actualOutput;
    const formattedTime = message.formattedTime;
    const isOnlineCompiler = message.isOnlineCompiler;
    // console.log(msg.content.toString());
    //result Queue
    let result;
    let passedCases;
    try {
      if (language === "javascript") {
        let { output, isError, executionTime } = await nodejsCompiler(code);
        // console.log(executionTime, "this is eceution itme");

        output = output.replace(/\u001b\[\d{1,2}m/g, "");
        if (!isOnlineCompiler) {
          let testCases = OutputSeperator(output, language);
          console.log(testCases, actualOutput.output);
          passedCases = solutionJudge(actualOutput.output, testCases);
        }
        if (isError) {
          result = {
            msg: "Execution error:",
            output: output,
            testCases: [],
            executionTime: executionTime,
          };
          // return res.status(200).json(result);
        } else {
          result = {
            msg: "success",
            output: output,
            submittedAt: formattedTime,
            testCases: passedCases,
            executionTime: executionTime,
          };
          // return res.status(200).json(result);
        }
      }
      if (language === "python") {
        let { output, isError, executionTime } = await pythonCompiler(code);
        console.log("this is eexecution time", executionTime);
        // output = output.replace(/\u001b\[\d{1,2}m/g, "");
        output = output.replace(/[\u0000-\u0008\u000b\u000E-\u001F]/g, "");
        // console.log(output);
        // output = output.replace(
        //   /[\u0000-\u0008\u000A-\u000E\u0010-\u001F]/g,
        //   ""
        // );
        if (!isOnlineCompiler) {
          let testCases = OutputSeperator(output, language);
          passedCases = solutionJudge(actualOutput.output, testCases);
        }
        if (isError) {
          result = {
            msg: "Execution error: tata",
            testCases: [],
            output: output,
            executionTime: executionTime,
          };
          //  return res.status(200).json(result);
        } else {
          result = {
            msg: "success",
            output: output,
            submittedAt: formattedTime,
            testCases: passedCases,
            executionTime: executionTime,
          };
          // return res.status(200).json(result);
        }
      }
    } catch (error) {
      console.log(error);
    }
    let resultQueue = "resultQueue";
    await channel.assertQueue(resultQueue);
    await channel.sendToQueue(resultQueue, Buffer.from(JSON.stringify(result)));
    channel.ack(msg);
  });
}

rcp().catch(console.error);
