const express = require("express");
const {
  CompileCode,
  codeQueSubmit,
  getAllProblems,
  getSingleProblems,
} = require("../controllers/codeControllers");
const router = express.Router();

router.route("/compile").post(CompileCode);
router.route("/codeQueSubmit").post(codeQueSubmit);
router.route("/allProblems").get(getAllProblems);
router.route("/problems/:id").get(getSingleProblems);

module.exports = router;
