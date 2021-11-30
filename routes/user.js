// Imports
const router = require("express").Router();
const controller = require("../controllers");

// Middleware
const authRequired = require("../middleware/authRequired");

// Routes
router.get("/", authRequired, controller.user.show);
router.get("/:id", authRequired, controller.user.show);
router.put("/:id", authRequired, controller.user.update);
router.delete("/:id", authRequired, controller.user.destroy);

// Exports
module.exports = router;
