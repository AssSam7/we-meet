const express = require("express");
const router = express.Router();

// Adding the routes
router.get("/", (req, res) => {
  res.render("home-guest");
});

// Export the router created
module.exports = router;
