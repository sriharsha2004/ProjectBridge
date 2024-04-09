const express = require("express");
const router = express.Router();

const controller = require("../controllers/EntrCostHandler")
const verifyToken = require("../middlewares/verifyToken")

router.post("/postCost", verifyToken , controller.postcosttoInv);

router.get("/all/:mail",controller.getAllAppeals);

module.exports = router;