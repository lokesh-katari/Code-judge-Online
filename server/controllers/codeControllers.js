const moment = require('moment');

const {nodejsCompiler, pythonCompiler}= require('../containers/compilerimages')

exports.CompileCode = async(req,res)=>{
  const currentTime = Date.now();

  const formattedTime = moment(currentTime).format('YYYY-MM-DD HH:mm:ss');
  console.log(formattedTime);
    let code = req.body.code;
    let language = req.body.language;
    console.log(language,code);
   
    
   try {
    if (language === 'javascript') {
      let { output, isError } = await nodejsCompiler(code);
      output = output.replace(/\u001b\[\d{1,2}m/g, '');
    
      if (isError) {
        res.status(200).json({ msg: 'Execution error:', output: output });
      } else {
        res.status(200).json({ msg: 'success', output: output, submittedAt: formattedTime });
      }
    }
    if (language === 'python') {
      let { output, isError } = await pythonCompiler(code);

      // output = output.replace(/\u001b\[\d{1,2}m/g, '');
      console.log(output);
      if (isError) {
        res.status(200).json({ msg: 'Execution error:', output: output });
      } else {
        res.status(200).json({ msg: 'success', output: output, submittedAt: formattedTime });
      }
    }
    
   } catch (error) {
    console.log(error);
   }
}
