
const Plan = require('../models/plan.model.js');

exports.add = async (req, res) => {
   
    if (!req.body || !req.body.organizationid) {
        return res.status(400).send({
            message: "Content cannot be empty or missing organization ID!"
        });
    }

    
    const data = {
        organizationid: req.body.organizationid, 
        plan_name: req.body.plan_name,
        batch: req.body.batch,
        payment_method: req.body.payment_method,
        day_month_count: req.body.day_month_count,
        registration_fee: req.body.registration_fee,
        plan_amount: req.body.plan_amount,
        description: req.body.description,
        status: req.body.status || 'enabled'
    };

    try {
       
        const result = await Plan.add(data);
        res.status(201).send(result);
    } catch (err) {
        console.error("Error while adding plan: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while adding the plan."
        });
    }
};


exports.listAll = async (req, res) => {
    const { organizationId } = req.params;
    

    try {
        // Fetch plans for the specific organization
        const plans = await Plan.findAll({
            where: {
                organizationid: organizationId
            },
            
            attributes: [
                'id',
                'plan_name',
                'plan_amount',
                'batch',
                'payment_method',
                'day_month_count',
                'registration_fee',
                'status'
            ]
        });
                
                
        // Prepare response with status button
        const response = plans.map(plan => ({
            id: plan.id,
            name: plan.plan_name,
            plan_amount: plan.plan_amount,
            batch_value: plan.batch,
            mode_of_payment: plan.payment_method,
            count_value: plan.day_month_count,
            registration_fee: plan.registration_fee,
            status: plan.status,
            statusButton: plan.status === 'disabled'
                ? '<button style="background-color: red;">Disabled</button>'
                : '<button>Enabled</button>'
        }));

        res.status(200).send(response);
    } catch (error) {
        console.error("Error while listing plans:", error);
        res.status(500).send({
            message: error.message || "Some error occurred while listing plans"
        });
    }
}

exports.togglePlanStatus = async (req, res) => {
    try {
        const planId = req.params.id;

        // Find the plan by its primary key (id)
        const plan = await Plan.findByPk(planId);

        if (!plan) {
            return res.status(404).json({ message: 'Plan not found' });
        }

        // Toggle the status between 'enabled' and 'disabled'
        plan.status = plan.status === 'enabled' ? 'disabled' : 'enabled';
        await plan.save();

        // Respond with success message and updated plan status
        res.status(200).json({
            message: 'Plan status updated successfully',
            plan
        });
    } catch (error) {
        console.error("Error while toggling plan status:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

