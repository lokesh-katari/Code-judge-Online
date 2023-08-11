const moment = require("moment");
const fs = require("fs");
const codeQueSchema = require("../Models/CodeQuestionSchema");
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
} = require("../TemplateGenerator/PythonGenerator");

exports.CompileCode = async (req, res) => {
  const currentTime = Date.now();

  const formattedTime = moment(currentTime).format("YYYY-MM-DD HH:mm:ss");

  // const regex = /(["'])(\\\\n")/g;
  // code = code.replace(/\r\n/g, "\n");
  // const replacedCode = code.replace(regex, '$1\\\\\\\\n"');
  let code = req.body.code;
  // code = JSON.parse(code); //json parsing should be avoided

  let language = req.body.language;
  console.log(language, code);
  try {
    if (language === "javascript") {
      let { output, isError } = await nodejsCompiler(code);
      output = output.replace(/\u001b\[\d{1,2}m/g, "");

      if (isError) {
        res.status(200).json({ msg: "Execution error:", output: output });
      } else {
        res
          .status(200)
          .json({ msg: "success", output: output, submittedAt: formattedTime });
      }
    }
    if (language === "python") {
      let { output, isError } = await pythonCompiler(code);

      // output = output.replace(/\u001b\[\d{1,2}m/g, '');
      console.log(output);
      if (isError) {
        res.status(200).json({ msg: "Execution error:", output: output });
      } else {
        res
          .status(200)
          .json({ msg: "success", output: output, submittedAt: formattedTime });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
exports.codeQueSubmit = async (req, res) => {
  try {
    let {
      problemTitle,
      problemDesc,
      returnType,
      inputType,
      testCases,
      inputParams,
      output,
    } = req.body;
    let proTitle = creatingProTitle(problemTitle);

    let createFunc = createFunctionTemplate(proTitle, inputParams, returnType);
    let testCasesTemplate = generateTestCasesinJS(testCases, proTitle, output);
    let pythonTemplate = pythonMainfuncGenerator(
      testCases,
      proTitle,
      output,
      inputParams,
      returnType
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
        \t# Add more test cases as needed`,
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
