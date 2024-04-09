const express = require("express");
const SignUpmodel = require("../models/signupSchema")
const controllers = require("../controllers/validate")
const router = express.Router();

router.post("/SignUp" , controllers.signup);

router.post("/SignIn" , controllers.signin);

module.exports = router;