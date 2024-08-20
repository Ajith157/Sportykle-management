const sql = require("./db.js");
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Paymentmode = sequelize.define('paymentmodes', {
  
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    organizationid:{type:Sequelize.INTEGER, allowNull:false},
    name: { type: Sequelize.STRING, allowNull:false },
    description: { type: Sequelize.STRING, allowNull:true },
    photo: { type: Sequelize.STRING, allowNull:true },
    status: { type: Sequelize.STRING,defaultValue:'Active', allowNull:true },
    created_at:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updated_at:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false
    }
});
sequelize.sync();



Paymentmode.add =  (data, result) => {

  if(data.photo.path=='' || data.photo.path==undefined) {
      var img = '';
  } else {
      var img = data.photo.path.split("\\")[2];
  }

  sql.query(`insert into paymentmodes(organizationid,name,description,photo) select '${data.orgid}','${data.name}',${sql.escape(data.description)},'${img}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, {status: '200', msg:'Paymnent Mode Saved'});
  });


};

Paymentmode.list = (data,result) => {
	sql.query(`select * from paymentmodes where organizationid='${data.orgid}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, {status: '200', data:res});
  });
}

module.exports = Paymentmode;