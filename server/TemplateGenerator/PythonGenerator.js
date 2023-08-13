function pythonMainfuncGenerator(
  testCases,
  problemTitle,
  output,
  inputParams,
  returnType,
  caseNum
) {
  let replacedTitle = `class Solution:
  def ${problemTitle}(self,${inputParams}):
      # write your code logic here
      # this function should return String
      pass\n
  \t#this funciton should return ${returnType}\n\n\n\nif __name__ == "__main__":\n\tsolution = Solution()\n`;
  for (let i = 0; i < testCases.length; i++) {
    replacedTitle += `\tprint("test case ${i + caseNum}:")\n`;
    for (let j = 0; j < testCases[i].name.length; j++) {
      let testcasesString = `\t${testCases[i].name[j]} = ${JSON.stringify(
        testCases[i].values[j]
      )}\n`;
      replacedTitle += testcasesString;
    }
    replacedTitle += `\tresult${
      i + caseNum
    } = solution.${problemTitle}(${testCases[i].name.join(
      ", "
    )})#output should be ${output[i]}\n\n\tprint(result${i + caseNum})\n`;
  }

  return replacedTitle;
}

function generateTestCasesforPython(testCases, problemTitle, output, caseNum) {
  let replacedTitle = "";
  for (let i = 0; i < testCases.length; i++) {
    replacedTitle += `\tprint("test case ${i + caseNum}:")\n`;
    for (let j = 0; j < testCases[i].name.length; j++) {
      let testcasesString = `\t${testCases[i].name[j]} = ${JSON.stringify(
        testCases[i].values[j]
      )}\n`;
      replacedTitle += testcasesString;
    }
    replacedTitle += `\tresult${
      i + caseNum
    } = solution.${problemTitle}(${testCases[i].name.join(
      ", "
    )})#output should be ${output[i]}\n\n\tprint(result${i + caseNum})\n`;
  }
  return replacedTitle;
}
module.exports = { pythonMainfuncGenerator, generateTestCasesforPython };
