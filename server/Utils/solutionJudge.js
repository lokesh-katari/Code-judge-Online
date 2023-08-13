const solutionJudge = (totalOutputs, testCases) => {
  let passedCases = [];
  for (let i = 0; i < totalOutputs.length; i++) {
    if (totalOutputs[i] === testCases[i]) {
      passedCases.push(i);
    }
  }
  return passedCases;
};

module.exports = { solutionJudge };
