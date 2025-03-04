'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('plants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      branch_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'branches',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      photo_uuid: {
        type: Sequelize.STRING
      },
      moisture_target: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false
      },
      moisture_latest: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
        default: 1
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('plants');
  }
};