// models/Staff.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/sequelize');
const Organization = require('../models/organization.model');

const Staff = sequelize.define('Staff', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  profile_photo: { type: DataTypes.STRING, allowNull: true }, 
  name: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.STRING, allowNull: false },
  dob: { type: DataTypes.DATEONLY, allowNull: false },
  date_of_joining: { type: DataTypes.DATEONLY, allowNull: false },
  mobile: { type: DataTypes.STRING, allowNull: false },
  alternate_mobile: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  address: { type: DataTypes.STRING, allowNull: false },
  documents: { type: DataTypes.STRING, allowNull: true },
  payment_term: { type: DataTypes.STRING, allowNull: false },
  
  // Fields for profit share with type (percentage/amount)
  profit_share_type: { 
    type: DataTypes.ENUM('percentage', 'amount'), 
    allowNull: false, 
    defaultValue: 'percentage' 
  },
  profit_share_value: { type: DataTypes.FLOAT, allowNull: true },
  
  // Fields for CRM commission with type (percentage/amount)
  crm_commission_type: { 
    type: DataTypes.ENUM('percentage', 'amount'), 
    allowNull: false, 
    defaultValue: 'percentage' 
  },
  crm_commission_value: { type: DataTypes.FLOAT, allowNull: true },

  // Fields for service commission with type (percentage/amount)
  service_commission_type: { 
    type: DataTypes.ENUM('percentage', 'amount'), 
    allowNull: false, 
    defaultValue: 'percentage' 
  },
  service_commission_value: { type: DataTypes.FLOAT, allowNull: true },
  
  late_penalty: { type: DataTypes.FLOAT, allowNull: true },
  deduct_salary_for_absent: { type: DataTypes.BOOLEAN, allowNull: true },
  
  // Store days as a JSON array
  select_days: {
    type: DataTypes.JSON,
    allowNull: true
  },
  working_time_from: { type: DataTypes.TIME, allowNull: true },
  working_time_to: { type: DataTypes.TIME, allowNull: true },
  
  notes: { type: DataTypes.TEXT, allowNull: true },
  staff_category: { type: DataTypes.STRING, allowNull: false },
  enable_admin_access: { type: DataTypes.BOOLEAN, defaultValue: false },
  username: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: true },
}, {
  timestamps: true,
  underscored: true
});

Staff.belongsTo(Organization, { foreignKey: 'organization_id' });

module.exports = Staff;
