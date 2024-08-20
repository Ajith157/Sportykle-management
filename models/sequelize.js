const Sequelize = require('sequelize')
const sequelize = new Sequelize(
   'sportykle', 
   'root', 
   'root', {
      dialect: 'mysql',
      host: '127.0.0.1',
      logging: false
   }
);
module.exports = sequelize







