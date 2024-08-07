'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      taskId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      taskName: { type: Sequelize.STRING  },
      description: { type: Sequelize.TEXT },
      startAt: { type: Sequelize.DATE },
      deadline: { type: Sequelize.DATE },
      statusId: { type: Sequelize.INTEGER},
      createdAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};