const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  CompileCode,
  codeQueSubmit,
  getAllProblems,
  getSingleProblems,
  submitSolution,
  fetchResult,
} = require("../controllers/codeControllers");
const router = express.Router();

router.route("/compile").post(CompileCode);
router.route("/codeQueSubmit").post(codeQueSubmit);
router.route("/allProblems").get(getAllProblems);
router.route("/problems/:id").get(getSingleProblems);
router.route("/problem/submit").post(submitSolution);
router.route("/problem/submit/fetch/:processId").get(fetchResult);

module.exports = router;
