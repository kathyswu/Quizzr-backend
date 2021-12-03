// Imports
const router = require("express").Router();
const controller = require("../controllers");

// Routes
router.get("/", controller.quiz.index);
router.get("/:id", controller.quiz.findOne);
router.get("/userQuizzes", controller.quiz.userQuizzes);
router.post("/", controller.quiz.create);
router.put("/:id", controller.quiz.update);
router.delete("/:id", controller.quiz.destroy);

// Exports
module.exports = router;
