const Sequelize = require('sequelize');
const sequelize = require('./sequelize'); 

const Workout = sequelize.define('workouts', {
    workout_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    organization_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: { 
        type: Sequelize.STRING,
        allowNull: false 
    },
    workout_type: {
        type: Sequelize.STRING,
        allowNull: true
    },
    workout_duration: {
        type: Sequelize.STRING,
        allowNull: true
    },
    workout_note: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    workout_image: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


module.exports = Workout;