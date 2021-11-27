// Imports
const router = require("express").Router();
const controller = require("../controllers");

// Routes
router.post("/register", controller.auth.register);
router.post("/login", controller.auth.login);

// Exports
module.exports = router;
