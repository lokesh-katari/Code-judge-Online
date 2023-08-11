function generateParametersinJS(parameters) {
  let generatedString = "";
  for (let i = 0; i < parameters.length; i++) {
    // Corrected typo: "length" instead of "lenght"
    let templateString = `* @param {${parameters[i].type}} ${parameters[i].name}\n`;
    generatedString += templateString;
  }
  return generatedString;
}
function generateTestCasesinJS(testCases, problemTitle, output) {
  let replacedTitle = "";
  for (let i = 0; i < testCases.length; i++) {
    replacedTitle += `//Test Case ${i + 1} ::\n`;
    for (let j = 0; j < testCases[i].name.length; j++) {
      let testcasesString = `let ${testCases[i].name[j]} = ${JSON.stringify(
        testCases[i].values[j]
      )}\n`;
      replacedTitle += testcasesString;
    }
    replacedTitle += `const result${i + 1} = ${problemTitle}(${testCases[
      i
    ].name.join(", ")})//output should be ${output[i]}\n\nconsole.log(result${
      i + 1
    })`;
  }

  return replacedTitle;
}

function creatingProTitle(title) {
  const replacedTitle = title
    .replace(/\s+/g, "_")
    .replace(/^_+|_+$/g, "")
    .trim();
  return replacedTitle;
}

function createFunctionTemplate(problemTitle, inputParams, returnType) {
  let funcString = `const ${problemTitle} = function(${inputParams}){
          //write your code logic here
          //your code should return ${returnType} type
          
        }`;
  return funcString;
}
module.exports = {
  creatingProTitle,
  generateTestCasesinJS,
  generateParametersinJS,
  createFunctionTemplate,
};
