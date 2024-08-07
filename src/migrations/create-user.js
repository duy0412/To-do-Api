'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userName: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      refreshToken: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};