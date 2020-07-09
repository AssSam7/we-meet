const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const markdown = require("marked");
const sanitizeHTML = require("sanitize-html");

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
  // Make markdown function available within EJS templates
  res.locals.filterUserHTML = function (content) {
    return sanitizeHTML(markdown(content), {
      allowedTags: [
        "p",
        "br",
        "ul",
        "li",
        "strong",
        "italic",
        "bold",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
      allowedAttributes: [],
    });
  };

  // Flash Errors Globally
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");

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

// Making our app open for both express and socket.io
const server = require("http").createServer(app);

const io = require("socket.io")(server);

io.use(function (socket, next) {
  sessionOptions(socket.request, socket.request.res, next);
});

io.on("connection", function (socket) {
  console.log("A new user connected!");
  if (socket.request.session.user) {
    let user = socket.request.session.user;

    socket.emit("welcome", { username: user.username, avatar: user.avatar });

    socket.on("chatMessageFromBrowser", function (data) {
      socket.broadcast.emit("chatMessageFromServer", {
        message: sanitizeHTML(data.message, {
          allowedTags: [],
          allowedAttributes: [],
        }),
        username: user.username,
        avatar: user.avatar,
      });
    });
  }
});

// Making our app listen to incoming requests
module.exports = server;
