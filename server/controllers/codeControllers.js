const moment = require("moment");

const codeQueSchema = require("../Models/CodeQuestionSchema");
const { OutputSeperator } = require("../Utils/TestCaseSeperator");
const { solutionJudge } = require("../Utils/solutionJudge");
const {
  creatingProTitle,
  generateTestCasesinJS,
  generateParametersinJS,
  createFunctionTemplate,
} = require("../TemplateGenerator/jsGenerator");

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

  const formattedTime = moment(currentTime).format("YYYY-MM-DD HH:mm:ss");

  // const regex = /(["'])(\\\\n")/g;
  // code = code.replace(/\r\n/g, "\n");
  // const replacedCode = code.replace(regex, '$1\\\\\\\\n"');
  let code = req.body.code;
  // code = JSON.parse(code); //json parsing should be avoided
  let P_id = req.body.id;
  let actualOutput = await codeQueSchema.findById(P_id).select("output");
  let language = req.body.language;
  // console.log(language, code);
  try {
    if (language === "javascript") {
      let { output, isError } = await nodejsCompiler(code);

      output = output.replace(/\u001b\[\d{1,2}m/g, "");
      let testCases = OutputSeperator(output, language);
      // let passedCases = [];
      // for (let i = 0; i < actualOutput.output.length; i++) {
      //   if (actualOutput.output[i] === testCases[i]) {
      //     passedCases.push(i);
      //   }
      // }
      let passedCases = solutionJudge(actualOutput.output, testCases);
      if (isError) {
        res.status(200).json({
          msg: "Execution error:",
          output: output,
        });
      } else {
        res.status(200).json({
          msg: "success",
          output: output,
          submittedAt: formattedTime,
          testCases: passedCases,
        });
      }
    }
    if (language === "python") {
      let { output, isError } = await pythonCompiler(code);

      // output = output.replace(/\u001b\[\d{1,2}m/g, '');
      output = output.replace(/[\u0000-\u0008\u000b\u000E-\u001F]/g, "");
      // console.log(output);
      let testCases = OutputSeperator(output, language);
      let passedCases = solutionJudge(actualOutput.output, testCases);
      if (isError) {
        res.status(201).json({ msg: "Execution error:", output: error });
      } else {
        res.status(200).json({
          msg: "success",
          output: output,
          testCases: passedCases,
          submittedAt: formattedTime,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
exports.submitSolution = async (req, res) => {
  const currentTime = Date.now();

  const formattedTime = moment(currentTime).format("YYYY-MM-DD HH:mm:ss");
  let code = req.body.code;
  let P_id = req.body.id;
  let i = 3; //test case generator
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

  let language = req.body.language;
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
      let { output, isError } = await nodejsCompiler(code);

      output = output.replace(/\u001b\[\d{1,2}m/g, "");
      let testCases = OutputSeperator(output, language);
      let passedCases = solutionJudge(totalOutputs, testCases);
      if (isError) {
        res.status(200).json({
          msg: "Execution error:",
          output: formatcode,
        });
      } else {
        res.status(200).json({
          msg: "success",
          output: output,
          submittedAt: formattedTime,
          testCases: passedCases,
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
      let { output, isError } = await pythonCompiler(code);
      // output = output.replace(/\u001b\[\d{1,2}m/g, '');
      output = output.replace(/[\u0000-\u0008\u000b\u000E-\u001F]/g, "");
      // console.log(output);
      let testCases = OutputSeperator(output, language);
      let passedCases = solutionJudge(totalOutputs, testCases);
      if (isError) {
        res.status(200).json({ msg: "Execution error:", output: output });
      } else {
        res.status(200).json({
          msg: "success",
          output: output,
          testCases: passedCases,
          submittedAt: formattedTime,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
  // console.log(formatcode);
  // console.log(hiddenTestCasesTemplate);
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
