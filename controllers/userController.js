const User = require("../models/User");

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      res.send(result);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.logout = function (req, res) {};

exports.register = function (req, res) {
  let user = new User(req.body);
  user.register();
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send("Registered!");
  }
};

exports.home = function (req, res) {
  res.render("home-guest");
};
