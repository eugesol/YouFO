
const fs = require('fs');

var isAuthenticated = require("../config/middleware/isAuthenticated");

var db = require("../models");

module.exports = function(app) {

  app.get("/signup", function(req, res) {
    res.render("signup")
  });

  app.get("/login", function(req, res) {
    res.render("login")
    
  });
  
  app.get("/registered", isAuthenticated, function(req, res) { 
     fs.readFile("./config/dropdown.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("Error reading file!")
        return
        }
      try {
        const bigBasket = JSON.parse(jsonString)
        console.log("Done successfully") 
          var thisBasket =  {
          country: bigBasket[0],
          state: bigBasket[1],
        }     
        res.render('registered', thisBasket)       
      }
      catch(err) {
        console.log("Error parsing JSON", err)
      }
      })     
     
   })
  
  
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/registered");
    }
    res.render("index");
  });
  
  app.get("/postSighting", function(req, res) {
    fs.readFile("./config/dropdown.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("Error reading file!")
        return
        }
      try {
        const bigBasket = JSON.parse(jsonString)
        console.log("Done successfully") 
        //console.log(bigBasket)
          var thisBasket =  {
          country: bigBasket[0],
          state: bigBasket[1],
        }     
        res.render("postSighting", thisBasket);       
      }
      catch(err) {
        console.log("Error parsing JSON", err)
      }
      })     
    
  });
 

};