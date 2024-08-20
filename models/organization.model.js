const sql = require("./db.js");
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Organization = sequelize.define('organizations', {
  
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    logo: { type: Sequelize.STRING, allowNull:true },
    banner: { type: Sequelize.STRING, allowNull:true },
    institutiontype: { type: Sequelize.STRING, allowNull:true },
    name: { type: Sequelize.STRING, allowNull:false },
    displayname: { type: Sequelize.STRING, allowNull:true },
    mobile : { type: Sequelize.STRING, allowNull:true },
    email : { type: Sequelize.STRING, allowNull:false },
    address1: { type: Sequelize.STRING, allowNull:true },
    address2: { type: Sequelize.STRING, allowNull:true },
    city: { type: Sequelize.STRING, allowNull:true },
    state: { type: Sequelize.STRING, allowNull:true },
    country: { type: Sequelize.STRING, allowNull:true },
    website: { type: Sequelize.STRING, allowNull:true },
    gst: { type: Sequelize.STRING, allowNull:true },
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


function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '180000s' });
}

Organization.create = (data, result) => {



  sql.query(`SELECT * FROM organizations WHERE email = '${data.email}'`, (err, res) => {
    
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, {status: '204', msg:'Email already registered with us. Please try login.'});
      return;
    } else {
      sql.query(`INSERT INTO organizations(name,email) values('${data.name}','${data.email}')`, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        sql.query(`INSERT INTO staff(organizationid,name,email,password,role,status) values('${res.insertId}','${data.name}','${data.email}','${data.password}','admin','active')`, '', (err, staff) => {
          if (err) {
            result(err, null);
            return;
          }

          sql.query(`INSERT INTO logins(staffid,email,password) values('${staff.insertId}','${data.email}','${data.password}')`, '', (err, res) => {
            if (err) {
              console.log(err);
              result(err, null);
              return;
            }
          });
        });

        result(null, {status: '200', msg:'Registration Successful. Please login using email and password'});
      });
    }
  });


};

Organization.login =  (data, result) => {

  sql.query(`SELECT * from logins WHERE email = '${data.email}'`, async (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      const comparison = await bcrypt.compare(data.password, res[0].password)

      if(comparison){

          const token = generateAccessToken({ userid: res[0].id });

          result(null, {status: '200', msg:'Login Successful. You will be redirected to dashboard in 2 seconds', id:res[0].id, role:'admin', name:res[0].name, token: token});
  
      } else {
        result(null, {status: '204', msg:'Invalid Login Details'});
      }
    } else {
      result(null, {status: '204', msg:'Invalid Login Details'});
    }
  });


};




module.exports = Organization;
