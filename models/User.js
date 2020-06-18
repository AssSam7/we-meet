const usersCollection = require("../db").db().collection("users");
const validator = require("validator");
const bcrypt = require("bcryptjs");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  if (typeof this.data.username !== "string") {
    this.data.username = "";
  }
  if (typeof this.data.email !== "string") {
    this.data.email = "";
  }
  if (typeof this.data.password !== "string") {
    this.data.password = "";
  }

  // Getting rid of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
  };
};

User.prototype.validate = function () {
  if (this.data.username == "") {
    this.errors.push("You must provide a username");
  }
  // Username Validation
  if (
    this.data.username != "" &&
    !validator.isAlphanumeric(this.data.username)
  ) {
    this.errors.push("Username can only contain letters and numbers");
  }
  // Email Validation
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("You must enter a valid email address");
  }
  if (this.data.password == "") {
    this.errors.push("You must provide a password");
  }
  if (this.data.username > 0 && this.data.username.length <= 3) {
    this.errors.push("Username must be atleast 3 characters");
  }
  if (this.data.username.length > 30) {
    this.errors.push("Username cannot exceed 30 characters");
  }
  if (this.data.password > 0 && this.data.password.length <= 12) {
    this.errors.push("Password must be atleast 12 characters");
  }
  if (this.data.password.length > 50) {
    this.errors.push("Password cannot exceed 50 characters");
  }
};

User.prototype.register = function () {
  // Step #1: Validate user data
  this.cleanUp();
  this.validate();

  // Step #2: Only if there are no validation errors, persist to database
  if (!this.errors.length) {
    let salt = bcrypt.genSaltSync(10);
    this.data.password = bcrypt.hashSync(this.data.password, salt);
    usersCollection.insertOne(this.data);
  }
};

// Login Model
User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    // Checking the username first before password
    usersCollection
      .findOne({ username: this.data.username })
      .then((attemptedUser) => {
        if (
          attemptedUser &&
          bcrypt.compareSync(this.data.password, attemptedUser.password)
        ) {
          resolve("Congrats");
        } else {
          reject("Invalid Username or password");
        }
      })
      .catch((err) => {
        reject("Please try again later!");
      });
  });
};

module.exports = User;
