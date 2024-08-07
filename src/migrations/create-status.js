'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Status', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: { type: Sequelize.STRING  }
    });

    await queryInterface.bulkInsert('Status', [{
        id: 0,
        name: "Completed"
      }, {
        id: 1,
        name: "Ongoing"
      }, {
        id: 2,
        name: "Pending"
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Status');
  }
};