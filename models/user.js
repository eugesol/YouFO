const bcrypt = require("bcryptjs");
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      User.belongsToMany(models.Sighting, {
        through: 'userFavorites'
      })
    }
    
  };
  User.init({
    firstName: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(64),
      isEmail: true,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      notEmpty: true,
    }    
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