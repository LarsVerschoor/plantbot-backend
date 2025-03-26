const hash = require('../../utils/hash');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Plantbot, {
        foreignKey: 'user_id'
      });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    email_verified: DataTypes.TINYINT,
    email_verification_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
      attributes: { exclude: ['password', 'email_verification_code'] }
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ['password']
        }
      },
      withEmailVerificationCode: {
        attributes: {
          include: ['email_verification_code']
        }
      },
      withAllSensitiveData: {
        attributes: {
          include: ['password, email_verification_code']
        }
      }
    }
  });
  return User;
};