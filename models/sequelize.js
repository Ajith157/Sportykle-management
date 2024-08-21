



const Sequelize = require('sequelize')
const sequelize = new Sequelize(
   'bbnet_sportykle', 
   'bbnet_admin', 
   '&Emad&,2HLm;', {
      dialect: 'mysql',
      host: '162.241.123.75',
      logging: false
   }
);
module.exports = sequelize




