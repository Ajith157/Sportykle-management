const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 


const Sports = sequelize.define('Sports', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    organization_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    number_of_facility: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    centre: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
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
    timestamps: false,
    tableName: 'sports'
});

module.exports = Sports;
