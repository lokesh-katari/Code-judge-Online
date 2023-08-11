function generateTestCasesinJS(testCases, problemTitle) {
  let replacedTitle = "";
  for (let i = 0; i < testCases.length; i++) {
    replacedTitle += `Test Case ${i + 1} ::\n`;
    for (let j = 0; j < testCases[i].name.length; j++) {
      let testcasesString = `let ${testCases[i].name[j]} = ${JSON.stringify(
        testCases[i].values[j]
      )}\n`;
      replacedTitle += testcasesString;
    }
    replacedTitle += `const result${i + 1} = ${problemTitle}(${testCases[
      i
    ].name.join(", ")})\n\n`;
  }

  return replacedTitle;
}
