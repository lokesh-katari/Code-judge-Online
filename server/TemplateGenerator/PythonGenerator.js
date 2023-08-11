function pythonMainfuncGenerator(
  testCases,
  problemTitle,
  output,
  inputParams,
  returnType
) {
  let replacedTitle = `class Solution:
  def ${problemTitle}(self,${inputParams}):
      # write your code logic here
      # this function should return String
      pass\n
  \t#this funciton should return ${returnType}\n\n\n\nif __name__ == "__main__":\n\tsolution = Solution()\n`;
  for (let i = 0; i < testCases.length; i++) {
    replacedTitle += `#Test Case ${i + 1} ::\n`;
    for (let j = 0; j < testCases[i].name.length; j++) {
      let testcasesString = `\t${testCases[i].name[j]} = ${JSON.stringify(
        testCases[i].values[j]
      )}\n`;
      replacedTitle += testcasesString;
    }
    replacedTitle += `\tresult${i + 1} = solution.${problemTitle}(${testCases[
      i
    ].name.join(", ")})#output should be ${output[i]}\n\n\tprint(result${
      i + 1
    })`;
  }

  return replacedTitle;
}

module.exports = { pythonMainfuncGenerator };
