const bcrypt = require("bcryptjs");
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
    }
    
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    favorites: DataTypes.STRING    
  }, {
    sequelize,
    modelName: 'User',
  });   

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

User.addHook("beforeCreate", function(user) {
user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};