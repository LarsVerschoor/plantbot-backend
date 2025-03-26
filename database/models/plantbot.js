'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Plantbot extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Plantbot.hasMany(models.Branch, {
                foreignKey: 'plantbot_id'
            });
            models.Plantbot.belongsTo(models.User, {
                foreignKey: 'user_id'
            });
        }
    }

    Plantbot.init({
        user_id: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'Plantbot',
        tableName: 'plantbots',
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Plantbot;
};