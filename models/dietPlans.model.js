
const Sequelize = require('sequelize');
const sequelize = require('./sequelize'); 

const DietPlan = sequelize.define('diet_plans', {
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
    diet_plan_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    validity: {
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    package_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    expiry_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active'
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = DietPlan;
