'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);


//The process.env global variable is injected by the Node at runtime for your pplication to use,
// and it represents the state of the system environment your application is in when it starts.
	
//When we write our code, we can never be sure where our application can be deployed.
//If we require a database in development, we spin up an instance of it and we link to it via a connection string
//However, when we deploy it to a server in production, we might possibly need to link it to a remote server

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

// initializing empty db obj to store information about user models/table data
const db = {};


//if statement that determines whether to use process.env if it exists, otherwise default to database params
//provided in the config.json file when creating new sequelize connection

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  //synchronously reads all the file names in the current directory
  .readdirSync(__dirname)

  //filtering out invalid file names and requiring them to be a '.js' file type
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {

    //for each valid file, we import the model using the sequelize import method
    //Effectively it calls require on the path and then calls the result with the sequelize instance as its first argument.
    //This is what ties the knot allowing the module to have a reference to the sequelize instance that imported it.
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);


   //adds the imported model to the empty obj, db.
   //It assigns the model to the obj using its name value as the key and the	model/table itself as the value.
    db[model.name] = model;
  });


//if the db object contains a method called associate(which is supposed
//specify relations between models),
//this function will run the method on each model in the db obj
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//these two lines add the sequelize connection and Sequelize library to our obj
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
