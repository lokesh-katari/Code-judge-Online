const express = require("express");
const {
  CompileCode,
  codeQueSubmit,
  getAllProblems,
  getSingleProblems,
  submitSolution,
} = require("../controllers/codeControllers");
const router = express.Router();

router.route("/compile").post(CompileCode);
router.route("/codeQueSubmit").post(codeQueSubmit);
router.route("/allProblems").get(getAllProblems);
router.route("/problems/:id").get(getSingleProblems);
router.route("/problem/submit").post(submitSolution);

module.exports = router;
