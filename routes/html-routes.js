

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/signup", function(req, res) {
    res.render("signup")
  });

  app.get("/login", function(req, res) {
    res.render("login")
    
  });
  
  app.get("/registered", isAuthenticated, function(req, res) {
    res.render("registered")
  });

};
