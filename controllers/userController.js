const User = require("../models/User");

exports.login = function (req, res) {};

exports.logout = function (req, res) {};

exports.register = function (req, res) {
  let user = new User(req.body);
  res.send("Thanks for trying to register!");
};

exports.home = function (req, res) {
  res.render("home-guest");
};
