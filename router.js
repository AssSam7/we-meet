const express = require("express");
const router = express.Router();

// Importing the user controller
const userController = require("./controllers/userController");

// Adding the routes
router.get("/", userController.home);

// Registration Route
router.post("/register", userController.register);

// Login Route
router.post("/login", userController.login);

// Login Route
router.post("/logout", userController.logout);

// Export the router created
module.exports = router;
