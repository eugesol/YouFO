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

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
