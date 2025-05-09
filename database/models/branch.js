'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Branch extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            models.Branch.belongsTo(models.Plantbot, {
                foreignKey: 'plantbot_id'
            });
            models.Branch.hasOne(models.Plant, {
                foreignKey: 'branch_id'
            });
        }
    }

    Branch.init({
        plantbot_id: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'Branch',
        tableName: 'branches',
        freezeTableName: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return Branch;
};