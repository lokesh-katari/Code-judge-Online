const moment = require("moment");

const {
  nodejsCompiler,
  pythonCompiler,
} = require("../containers/compilerimages");

exports.CompileCode = async (req, res) => {
  const currentTime = Date.now();

  const formattedTime = moment(currentTime).format("YYYY-MM-DD HH:mm:ss");

  // const regex = /(["'])(\\\\n")/g;
  // code = code.replace(/\r\n/g, "\n");
  // const replacedCode = code.replace(regex, '$1\\\\\\\\n"');
  let code = req.body.code;
  code = JSON.parse(code); //json parsing should be avoided
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
