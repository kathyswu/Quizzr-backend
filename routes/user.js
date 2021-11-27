// Imports
const router = require("express").Router();
const controller = require("../controllers");

// Middleware
const authRequired = require("../middleware/authRequired");

// Routes
router.get("/", authRequired, controller.user.show);

// Exports
module.exports = router;
