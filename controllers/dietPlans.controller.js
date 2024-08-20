// In your controller file (e.g., dietPlans.controller.js)
const DietPlan = require('../models/dietPlans.model.js');

exports.add = async (req, res) => {
    if (!req.body || !req.body.organization_id || !req.body.diet_plan_name || !req.body.validity || !req.body.package_type || !req.body.expiry_date) {
        return res.status(400).send({
            message: "Content cannot be empty or missing required fields!"
        });
    }

    const dietPlanData = {
        organization_id: req.body.organization_id,
        diet_plan_name: req.body.diet_plan_name,
        validity: req.body.validity,
        package_type: req.body.package_type,
        expiry_date: req.body.expiry_date,
        status: req.body.status || 'Active' 
    };

    try {
        await DietPlan.create(dietPlanData);
        res.status(201).send({ status: '200', message: 'Diet plan added successfully!' });
    } catch (err) {
        console.error("Error while adding diet plan: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while adding the diet plan."
        });
    }
};

exports.list = async (req, res) => {
    try {
        const dietPlans = await DietPlan.findAll();
        res.status(200).send(dietPlans);
    } catch (err) {
        console.error("Error while retrieving diet plans: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the diet plans."
        });
    }
};


exports.update = async (req, res) => {
    const id = req.params.id;
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    try {
        const dietPlan = await DietPlan.findByPk(id);
        if (!dietPlan) {
            return res.status(404).send({
                message: `Diet Plan with id ${id} not found`
            });
        }

        await DietPlan.update(req.body, {
            where: { id: id }
        });

        res.status(200).send({ message: 'Diet plan updated successfully!' });
    } catch (err) {
        console.error("Error while updating diet plan: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while updating the diet plan."
        });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await DietPlan.destroy({
            where: { id: id }
        });

        if (result === 0) {
            return res.status(404).send({
                message: `Diet Plan with id ${id} not found`
            });
        }

        res.status(200).send({ message: 'Diet plan deleted successfully!' });
    } catch (err) {
        console.error("Error while deleting diet plan: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the diet plan."
        });
    }
};