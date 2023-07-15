const express = require('express')
const {CompileCode}=require('../controllers/codeControllers')
const router = express.Router();

router.route('/compile').post(CompileCode);

module.exports = router;  