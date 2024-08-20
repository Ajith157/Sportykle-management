


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const WorkoutName = sequelize.define('workoutnames', {
    workout_name_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    workout_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'workouts', 
            key: 'workout_id'
        }
    },
    workout_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = WorkoutName;
