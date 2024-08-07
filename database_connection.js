const Sequelize = require('sequelize');
const sequelize = new Sequelize('todo', 'root', 'ndduy1204', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const connectedDatabase = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectedDatabase();