const express = require("express");
const app = express();

// Accessing the "router"
const router = require("./router");

// Configuring the views and templating engine
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

// Using the routes created in the router
app.use("/", router);

// Making our app listen to incoming requests
app.listen(3000);
