'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Plant.belongsTo(models.Branch, {
        foreignKey: 'branch_id'
      });
    }
  }
  Plant.init({
    name: DataTypes.STRING,
    branch_id: DataTypes.BIGINT,
    photo_uuid: DataTypes.STRING,
    moisture_target: DataTypes.DECIMAL(3, 2),
    moisture_latest: DataTypes.DECIMAL(3, 2)
  }, {
    sequelize,
    modelName: 'Plant',
    tableName: 'plants',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Plant;
};