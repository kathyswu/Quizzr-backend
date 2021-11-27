// Imports
const router = require("express").Router();
const controller = require("../controllers");

// Routes
router.get("/", controller.quiz.index);
router.get("/:id", controller.quiz.show);
router.post("/", controller.quiz.create);
router.put("/:id", controller.quiz.update);
router.delete("/:id", controller.quiz.delete);

// Exports
module.exports = router;

