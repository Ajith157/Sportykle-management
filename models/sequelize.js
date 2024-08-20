// const Sequelize = require('sequelize')
// const sequelize = new Sequelize(
//    'sportykle', 
//    'root', 
//    'root', {
//       dialect: 'mysql',
//       host: '127.0.0.1',
//       logging: false
//    }
// );
// module.exports = sequelize

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
   'bbnet_sportykle', 
   'bbnet_admin', // Corrected from 'admin'
   '&Emad&,2HLm;', {
      dialect: 'mysql',
      host: '127.0.0.1',
      logging: false
   }
);
module.exports = sequelize;






