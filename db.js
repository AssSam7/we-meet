// Requiring or Importing the MongoDB package
const mongodb = require("mongodb");

// Connection String
const connectionString =
  "mongodb+srv://m001-student:m001-mongodb-basics@sandbox-zwxrj.mongodb.net/WeMeetApp?retryWrites=true&w=majority";

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    module.exports = client.db();
    // Start our express app (Main Application)
    const app = require("./app");
    app.listen(3000);
  }
);
