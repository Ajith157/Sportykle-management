


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/sequelize');

const Organization = sequelize.define('Organization', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  profile_photo: { 
    type: DataTypes.STRING, 
    allowNull: true // New field for profile photo, placed right after the id
  },
  logo: { type: DataTypes.STRING, allowNull: true },
  banner: { type: DataTypes.STRING, allowNull: true },
  institutiontype: { type: DataTypes.STRING, allowNull: true },
  name: { type: DataTypes.STRING, allowNull: false },
  displayname: { type: DataTypes.STRING, allowNull: true },
  mobile: { type: DataTypes.STRING, allowNull: true },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure the email is unique
    validate: {
      notEmpty: true,
    }
  },
  address1: { type: DataTypes.STRING, allowNull: true },
  address2: { type: DataTypes.STRING, allowNull: true },
  city: { type: DataTypes.STRING, allowNull: true },
  state: { type: DataTypes.STRING, allowNull: true },
  country: { type: DataTypes.STRING, allowNull: true },
  pincode: { 
    type: DataTypes.STRING, 
    allowNull: true // New field for pincode, placed below the country
  },
  website: { type: DataTypes.STRING, allowNull: true },
  gst: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  hooks: {
    beforeUpdate: (organization, options) => {
      if (organization.changed('email')) {
        throw new Error('Email cannot be updated');
      }
    }
  }
});



module.exports = Organization;













