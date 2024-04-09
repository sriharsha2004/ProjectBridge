const express = require("express");
const router = express.Router();
const controller = require("../controllers/projecthandler")

const verifyToken = require("../middlewares/verifyToken");

router.get("/all",verifyToken, controller.getAllprojects);

router.get("/:mail",controller.getprojectsWithmail);

router.post("/new",verifyToken , controller.postProject);

router.delete("/delete/:id", verifyToken ,controller.deleteProject);

router.put("/update/:id",controller.updateProject);


module.exports = router;