const express = require("express");
const router = express.Router();

const controller = require("../controllers/InvesterHandler");
const verifyToken = require("../middlewares/verifyToken");

router.get("/all/:mail",controller.getAllinvestoppor);

router.put("/update/:id", verifyToken ,controller.updatestatus);

router.get("/student/all/:mail",controller.getAllstudents);

router.get("/Entrepreneur/all/:mail",controller.getAllEntrepreneurs);

module.exports = router;