
const Workout = require('../models/workouts.model.js');


exports.add = async (req, res) => {
    if (!req.body || !req.body.organization_id || !req.body.name) {
        return res.status(400).send({
            message: "Content cannot be empty or missing required fields!"
        });
    }

    const workoutData = {
        organization_id: req.body.organization_id,
        name: req.body.name, 
        workout_type: req.body.workout_type,
        workout_duration: req.body.workout_duration,
        workout_note: req.body.workout_note,
        workout_image: req.body.workout_image
    };

    try {
        const workout = await Workout.create(workoutData);
        res.status(201).send({ status: '200', message: 'Workout added successfully!' });
    } catch (err) {
        console.error("Error while adding workout: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while adding the workout."
        });
    }
};



exports.listAll = async (req, res) => {
    try {
        const workouts = await Workout.findAll();

        if (workouts.length === 0) {
            return res.status(404).send({
                message: "No workouts found."
            });
        }

        res.status(200).send(workouts);
    } catch (err) {
        console.error("Error while retrieving workouts: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the workouts."
        });
    }
};

exports.getWorkoutsByOrganizationId = async (req, res) => {
    const { organization_id } = req.params;

    try {
        const workouts = await Workout.findAll({
            where: { organization_id: organization_id }
        });

        if (workouts.length === 0) {
            return res.status(404).send({
                message: `No workouts found for organization ID ${organization_id}.`
            });
        }

        res.status(200).send(workouts);
    } catch (err) {
        console.error("Error while retrieving workouts: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the workouts."
        });
    }
};


exports.edit = async (req, res) => {
    const workoutId = req.params.id;

    if (!req.body || !req.body.organization_id || !req.body.name) {
        return res.status(400).send({
            message: "Content cannot be empty or missing required fields!"
        });
    }

    const updatedWorkoutData = {
        organization_id: req.body.organization_id,
        name: req.body.name,
        workout_type: req.body.workout_type,
        workout_duration: req.body.workout_duration,
        workout_note: req.body.workout_note,
        workout_image: req.body.workout_image
    };

    try {
        const [updated] = await Workout.update(updatedWorkoutData, {
            where: { workout_id: workoutId }
        });

        if (updated) {
            res.status(200).send({ message: 'Workout updated successfully!' });
        } else {
            res.status(404).send({ message: 'Workout not found.' });
        }
    } catch (err) {
        console.error("Error while updating workout: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while updating the workout."
        });
    }
};



exports.delete = async (req, res) => {
    const workoutId = req.params.id;

    try {
        const deleted = await Workout.destroy({
            where: { workout_id: workoutId }
        });

        if (deleted) {
          
            await WorkoutName.destroy({
                where: { workout_id: workoutId }
            });
            res.status(200).send({ message: 'Workout deleted successfully!' });
        } else {
            res.status(404).send({ message: 'Workout not found.' });
        }
    } catch (err) {
        console.error("Error while deleting workout: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the workout."
        });
    }
};

