// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const fs = require('fs');
const { sequelize } = require("../models");
const Op = sequelize.Sequelize.Op

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  
  });
  
  

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

 
  app.post("/api/sightings", function(req, res) {
    if (req.user) {
     db.Sighting.findAll({    
      limit: parseInt(req.body.count),      
       where: {   
        Country: req.body.location,         
        Date: {[Op.between]: [req.body.when1, req.body.when2]},
        State: req.body.section ,      
         },
       order:[["State", "DESC"] ]
     })
     .then(result => { 
      res.json(result);
    })
  } else (res.redirect("/login"))
  });

 app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        firstName: req.user.firstName,
        id: req.user.id,
      });
    }
  })  
 
 //still pending favorite update
  app.post("/api/registered", function(req, res) {
    db.User.addSighting ({ SightingId: req.body.SightingId});
  });
 
 
  app.post("/api/signup", function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  
  
  app.post("/api/ufo_sighting", function(req, res) {
    db.Sighting.create({
      Date: req.body.date,
      Time: req.body.time,
      Country: req.body.country,
      State: req.body.state,
      City: req.body.city,
      Duration: req.body.duration,
      Description: req.body.description,
      Shape: req.body.shape,
      DatePosted: req.body.datePosted
    })    
      .then(async function() {
        await res.redirect("/");
        
        await db.Sighting.findAll({
        })
        .then(data => {
         const bigBasket = [];
         const countries = [];
         const states = [];
        // console.log(data.length)
         for (let i=0; i<data.length; i++) {
           countries.push(data[i].dataValues.Country);
           states.push(data[i].dataValues.State);
         }
        filterCountry = [... new Set(countries)]
         filterStates = [... new Set(states)]
        filterCountry = {...filterCountry},
        filterStates = {... filterStates},
         bigBasket.push(filterCountry, filterStates)
         //Write data to local file for faster access
         const bigBasketJSON = JSON.stringify(bigBasket)
         fs.writeFile("./config/dropdown.json", bigBasketJSON, 'utf8', function(err) {
           if (err) {
             console.log("A write Error Occured!")
             return console.log(err)
           }
           console.log("JSON file updated")
         })
     
        })
         
      })
  });
}

