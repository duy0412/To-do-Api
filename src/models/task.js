'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'userId', as: 'userData'})
      Task.belongsTo(models.Status, {foreignKey: 'statusId', targetKey: 'statusId', as: 'statusData'})
    }
  }
  Task.init({
    taskId: {type: DataTypes.STRING, primaryKey: true},
    userId: DataTypes.STRING,
    taskName: DataTypes.STRING,
    statusId: DataTypes.INTEGER,
    startAt: DataTypes.DATE,
    deadline: DataTypes.DATE,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};