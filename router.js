const express = require("express");
const router = express.Router();

// Importing the user controller
const userController = require("./controllers/userController");

// Adding the routes
router.get("/", userController.home);

router.post("/register", userController.register);

// Export the router created
module.exports = router;
