const OutputSeperator = (output, language) => {
  const testCases = [];
  let regex;
  if (language === "javascript") {
    regex = /test case \d+:\r\n([\s\S]*?)(?=\r\ntest case|$)/g;
  }
  if (language === "python") {
    regex = /test case \d+:\n([\s\S]*?)(?=\rtest case|$)/g;
  }
  let match;

  while ((match = regex.exec(output)) !== null) {
    const data = match[1].trim();
    testCases.push(data);
  }

  return testCases;
};
module.exports = { OutputSeperator };
