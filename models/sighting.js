
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sighting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sighting.belongsToMany(models.User, {
        through: 'userFavorites'
      })
    }
  };
  Sighting.init({
    Date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    City:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    State:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Country:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Shape:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Duration:  {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Description:  {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    DatePosted: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    Longitude:  {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    
    createdAt: {
      type: DataTypes.DATE(3),
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    }
  }, {
    sequelize,
    modelName: 'Sighting',
  });
  return Sighting;
};