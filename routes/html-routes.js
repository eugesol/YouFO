const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/registered", isAuthenticated, (req, res) => {
    db.Sighting.findAll({
      limit: 10
    }).then(data => {
      res.render("registered", { data: data });
    });
  });

  app.get("/", (req, res) => {

    res.render("index");
  });
};
