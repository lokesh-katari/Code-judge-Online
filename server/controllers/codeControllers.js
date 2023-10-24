const moment = require("moment");
const amqp = require("amqplib");
const { v4: uuidv4 } = require("uuid");
const codeQueSchema = require("../Models/CodeQuestionSchema");
const { OutputSeperator } = require("../Utils/TestCaseSeperator");
const { solutionJudge } = require("../Utils/solutionJudge");
const {
  creatingProTitle,
  generateTestCasesinJS,
  generateParametersinJS,
  createFunctionTemplate,
} = require("../TemplateGenerator/jsGenerator");
const Submission = require("../Models/SubmissionModel");
const {
  nodejsCompiler,
  pythonCompiler,
} = require("../containers/compilerimages");
const {
  pythonMainfuncGenerator,
  generateTestCasesforPython,
} = require("../TemplateGenerator/PythonGenerator");
const { error } = require("console");

exports.CompileCode = async (req, res) => {
  const currentTime = Date.now();
  let actualOutput;
  const isOnlineCompiler = req.body.isOnlineCompiler;
  const formattedTime = moment(currentTime).format("YYYY-MM-DD HH:mm:ss");
  let code = req.body.code;
  // code = JSON.parse(code); //json parsing should be avoided
  if (!isOnlineCompiler) {
    let P_id = req.body.id;
    actualOutput = await codeQueSchema.findById(P_id).select("output");
  }
  let language = req.body.language;
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queue = "codeTest";
  const message = {
    language: language,
    code: code,
    actualOutput: actualOutput,
    formattedTime: formattedTime,
    isOnlineCompiler: isOnlineCompiler,
  };

  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

  channel.prefetch(1);
  // console.log(`Sent: ${JSON.stringify(message)}`);

  const result = await new Promise((resolve) => {
    channel.consume("resultQueue", async (msg) => {
      let result = msg.content.toString();
      result = JSON.parse(result);

      channel.ack(msg);

      // Close the channel and connection after receiving the result
      await channel.close();
      await connection.close();

      resolve(result);
    });
  });

  console.log(result);
  res.json(result).status(200);
  // connection.close();
};
exports.submitSolution = async (req, res) => {
  try {
    console.log("this is user submit");
    const connection = await amqp.connect("amqp://localhost");
    console.log("this is userid", req);
    const channel = await connection.createChannel();
    console.log("this is userid", req.user);
    const currentTime = Date.now();
    let userId = req.user.id;
    console.log("hii");
    const formattedTime = moment(currentTime).format("YYYY-MM-DD HH:mm:ss");
    let code = req.body.code;
    let P_id = req.body.id;
    // let i = 3; //test case generator

    let processId = uuidv4();

    let language = req.body.language;
    let queryResult = await codeQueSchema
      .findById(P_id)
      .select("hiddenOutputs")
      .select("hiddenTestCases")
      .select("ProblemTitle")
      .select("output");
    let totalOutputs = queryResult.output.concat(queryResult.hiddenOutputs);
    let hiddenOutputs = queryResult.hiddenOutputs;
    let hiddenTestCases = queryResult.hiddenTestCases;
    let proTitle = queryResult.ProblemTitle;
    const queue = "codeSubmit";
    const message = {
      language: language,
      code: code,
      formattedTime: formattedTime,
      hiddenTestCases: hiddenTestCases,
      hiddenOutputs: hiddenOutputs,
      totalOutputs: totalOutputs,
      proTitle: proTitle,
      processId: processId,
      userId: userId,
      submittedAt: formattedTime,
      P_id: P_id,
    };
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    // console.log(formatcode);
    // console.log(hiddenTestCasesTemplate);
    await channel.close();
    await connection.close();
    res
      .status(200)
      .json({ msg: "code submission queued", processId: processId });
  } catch (error) {
    res.status(500).json({ msg: error, req: "not found" });
  }
};
exports.codeQueSubmit = async (req, res) => {
  let i = 1; //test case generator
  try {
    let {
      problemTitle,
      problemDesc,
      returnType,
      testCases,
      inputParams,
      output,
      hiddenOutputs,
      hiddenTestCases,
      DifficultyLevel,
    } = req.body;
    let proTitle = creatingProTitle(problemTitle);

    let createFunc = createFunctionTemplate(proTitle, inputParams, returnType);
    let testCasesTemplate = generateTestCasesinJS(
      testCases,
      proTitle,
      output,
      i
    );
    let pythonTemplate = pythonMainfuncGenerator(
      testCases,
      proTitle,
      output,
      inputParams,
      returnType,
      i
    );

    let templateCode = [
      {
        language: "javascript",
        codeTemplate: `
${createFunc}\n
${testCasesTemplate}


// Add more test cases as needed

        
        `,
      },
      {
        language: "python",
        codeTemplate: `${pythonTemplate}
\t# Add more test cases as needed\n`,
      },
      {
        language: "cpp",
        codeTemplate: `ggsgdg`,
      },
    ];
    const codeQue = await codeQueSchema.create({
      template: templateCode,
      ProblemTitle: proTitle,
      ProblemDesc: problemDesc,
      output: output,
      hiddenOutputs: hiddenOutputs,
      hiddenTestCases: hiddenTestCases,
      DifficultyLevel: DifficultyLevel,
    });
    // output = output.replace(/\u001b\[\d{1,2}m/g, '');

    res.status(200).json({ msg: "success", output: codeQue });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllProblems = async (req, res) => {
  try {
    const Allproblems = await codeQueSchema.find();
    res.status(200).json({
      success: true,
      problems: Allproblems,
    });
  } catch (error) {
    res.status(500).json({
      success: flase,
      error: error,
    });
  }
};
exports.getSingleProblems = async (req, res) => {
  try {
    const problem = await codeQueSchema.findById(req.params.id);
    res.status(200).json({
      success: true,
      problems: problem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
exports.fetchResult = async (req, res) => {
  try {
    const data = await Submission.findOne({ processId: req.params.processId });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
