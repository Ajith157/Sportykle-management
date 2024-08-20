
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


exports.listAll=async (req,res)=>{

    try {
        
        const plans=await Plan.listAll();
        res.status(200).send(plans);
    } catch (error) {
        console.error("Error while listing plans:",error);
        res.status(500).send({
            message:error.message || "Some error occurred while list plans"
        })
        
        
    }
}
