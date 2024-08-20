
const Workout = require('../models/workouts.model.js');
const WorkoutName = require('../models/workoutname.model.js'); 

exports.add = async (req, res) => {
    if (!req.body || !req.body.organization_id || !req.body.name || !req.body.workout_names) {
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

    const workoutNamesData = req.body.workout_names.map(name => ({
        workout_name: name
    }));

    try {
       
        const workout = await Workout.create(workoutData);

 
        await WorkoutName.bulkCreate(
            workoutNamesData.map(name => ({
                workout_id: workout.workout_id,
                ...name
            }))
        );

        res.status(201).send({ status: '200', message: 'Workout and workout names added successfully!' });
    } catch (err) {
        console.error("Error while adding workout: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while adding the workout."
        });
    }
};


exports.listAll = async (req, res) => {
    try {
        
        const workoutNames = await WorkoutName.findAll({
            attributes: ['workout_name']
        });

        if (workoutNames.length === 0) {
            return res.status(404).send({
                message: "No workout names found."
            });
        }

        res.status(200).send(workoutNames);
    } catch (err) {
        console.error("Error while retrieving workout names: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the workout names."
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

