const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const Member = sequelize.define('Member', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    profile_photo: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alternative_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    documents: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date_of_joining: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    referral: {
        type: DataTypes.STRING,
        allowNull: true
    },
    center_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sports_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    batch_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    plan_name: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    assign_staff: {
        type: DataTypes.STRING,
        allowNull: false
    },
    select_days: {
        type: DataTypes.STRING,
        allowNull: false
    },
    services_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fee_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    billing_cycle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoice_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registration_fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    discount_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discount_application: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    plan_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    service_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    timestamps: false
});

// Associations
const Organization = require('../models/organization.model');
const Center = require('../models/addcentre.model');
const Sports = require('../models/addsports.model');
const Module = require('../models/addmodule.model');
const Batch = require('../models/addbatch.model');
const Service = require('../models/service.model');
 

Member.belongsTo(Organization, { foreignKey: 'organization_id' });
Member.belongsTo(Center, { foreignKey: 'center_id' });
Member.belongsTo(Sports, { foreignKey: 'sports_id' });
Member.belongsTo(Module, { foreignKey: 'module_id' });
Member.belongsTo(Batch, { foreignKey: 'batch_id' });
Member.belongsTo(Service, { foreignKey: 'services_id' });

module.exports = Member;
