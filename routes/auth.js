const express = require("express");
// const router = require("router"); //cause error use this ٧ instead
const router = express.Router();
const passportJWT = require("../midddlewares/passportJWT")();

const authController = require("../controllers/authController");
const { isEmail, hasPassword, hasName } = require("../validations/validators")

router.post("/login", authController.login);
router.post("/signup", [isEmail, hasPassword, hasName], authController.signup);
 router.get("/me", passportJWT.authenticate() ,authController.me);

module.exports = router;