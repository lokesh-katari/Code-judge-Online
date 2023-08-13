function generateParametersinJS(parameters) {
  let generatedString = "";
  for (let i = 0; i < parameters.length; i++) {
    // Corrected typo: "length" instead of "lenght"
    let templateString = `* @param {${parameters[i].type}} ${parameters[i].name}\n`;
    generatedString += templateString;
  }
  return generatedString;
}
function generateTestCasesinJS(testCases, problemTitle, output, caseNum) {
  let replacedTitle = "";
  for (let i = 0; i < testCases.length; i++) {
    replacedTitle += `//Test Case ${i + caseNum} ::\n`;
    for (let j = 0; j < testCases[i].name.length; j++) {
      let testcasesString = `let ${testCases[i].name[j]} = ${JSON.stringify(
        testCases[i].values[j]
      )}\n`;
      replacedTitle += testcasesString;
    }
    replacedTitle += `console.log("test case ${i + caseNum}:")\n`;
    replacedTitle += `const result${i + caseNum} = ${problemTitle}(${testCases[
      i
    ].name.join(", ")})//output should be ${output[i]}\n\nconsole.log(result${
      i + caseNum
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
