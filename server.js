// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");


// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8000;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//set handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
// check passport.js for explanation of sessions
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));


// Syncing our database and logging a message to the user upon success
// --------- //
//A model can be synchronized with the database by calling model.sync(options), an asynchronous function (that returns a Promise).
//With this call, Sequelize will automatically perform an SQL query to the database.
//This creates the table if it doesn't exist (and does nothing if it already exists)
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});
   