const dotenv = require("dotenv");
dotenv.config();

// Requiring or Importing the MongoDB package
const mongodb = require("mongodb");

mongodb.connect(
  process.env.CONNECTIONSTRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    module.exports = client.db();
    // Start our express app (Main Application)
    const app = require("./app");
    app.listen(process.env.PORT);
  }
);
