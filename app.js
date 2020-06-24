const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

const app = express();

// Configuration of sessions
let sessionOptions = session({
  secret: "JS is so cool",
  store: new MongoStore({ client: require("./db") }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
});
app.use(sessionOptions);
app.use(flash());

app.use(function (req, res, next) {
  // Make current user id available on the req object
  if (req.session.user) {
    req.visitorId = req.session.user._id;
  } else {
    req.visitorId = 0; // Then it's a guest user
  }

  // Make user session data from within view templates
  res.locals.user = req.session.user;
  next();
});

// Boiler plate for form values and json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Accessing the "router"
const router = require("./router");

// Configuring the views and templating engine
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

// Using the routes created in the router
app.use("/", router);

// Making our app listen to incoming requests
module.exports = app;
