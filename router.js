const express = require("express");
const router = express.Router();

// Importing the user controller
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");

// Adding the routes
router.get("/", userController.home);

/***** User Related Routes *****/

// Registration Route
router.post("/register", userController.register);

// Login Route
router.post("/login", userController.login);

// Logout Route
router.post("/logout", userController.logout);

/***** Post  Related Routes *****/
router.get(
  "/create-post",
  userController.mustBeLoggedIn,
  postController.viewCreateScreen
);

router.post(
  "/create-post",
  userController.mustBeLoggedIn,
  postController.create
);

router.get("/post/:id", postController.viewSingle);

// Export the router created
module.exports = router;
