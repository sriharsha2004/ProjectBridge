const express = require("express");
const router = express.Router();
const controller = require("../controllers/IdeaHandler");
const verifyToken = require("../middlewares/verifyToken");

router.post("/new",verifyToken,controller.uploadIdea);

router.get("/all/:mail" , verifyToken ,controller.getIdeas);

router.get("/:mail",controller.getIdeasformail);

router.delete("/delete/:id", verifyToken ,controller.deleteIdea);

module.exports = router;