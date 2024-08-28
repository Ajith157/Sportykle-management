const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/sequelize');


const Centre = sequelize.define('Centre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    organization_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    profile_photo: {
        type: Sequelize.STRING
    },
    centre_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    display_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
   
    mobile: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    alternate_number: {
        type: Sequelize.STRING(20)
    },
    address_line1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_line2: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING
    },
    gst_no: {
        type: Sequelize.STRING
    },
    website: {
        type: Sequelize.STRING
    },
    email_id: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    pincode: {
        type: Sequelize.STRING(10)
    },
    use_organization_data: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
   
    weekdays_from: {
        type: Sequelize.TIME
    },
    weekdays_to: {
        type: Sequelize.TIME
    },
    saturday_from: {
        type: Sequelize.TIME
    },
    saturday_to: {
        type: Sequelize.TIME
    },
    sunday_from: {
        type: Sequelize.TIME
    },
    sunday_to: {
        type: Sequelize.TIME
    },
    select_days: {
        type: Sequelize.ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday')
    },
   
   map_location: {
        type: Sequelize.STRING
    },
    referral: {
        type: Sequelize.ENUM('Walkin', 'Staff', 'Member', 'Facebook', 'Advertisement', 'Facebook', 'Other'),
        defaultValue: 'Other'
    },
   
    terms_and_conditions_note: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Centre;









