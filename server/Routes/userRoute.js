const express = require("express");
const {
  Userregister,
  userLogin,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getUserSubmissions,
  updateSubmissionsforUser,
} = require("../controllers/Usercontroller");
const isAuthenticated = require("../middleware/isAuthenticated");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.route("/register").post(upload.none(), Userregister);
router.route("/login").post(userLogin);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getUserDetails);
router.route("/user/submissions").get(isAuthenticated, getUserSubmissions);
router
  .route("/user/updatesubmission")
  .post(isAuthenticated, updateSubmissionsforUser);

module.exports = router;
