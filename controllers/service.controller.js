// controllers/service.controller.js
const Service = require('../models/service.model.js');

exports.add = async (req, res) => {
   
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    
    const data = {
        organizationid: req.body.organizationid,
        service_name: req.body.service_name,
        description: req.body.description,
        price: req.body.price,
        validity_period: req.body.validity_period,
        package_type: req.body.package_type,
        staff_id: req.body.staff_id,
        profile_share: req.body.profile_share,
        status: req.body.status || 'Enabled' 
    };

    try {
      
        const result = await Service.add(data);
        res.status(201).send(result);
    } catch (err) {
        console.error("Error while adding service: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while adding the service."
        });
    }
};



exports.listAll = async (req, res) => {
    try {
        
        const services = await Service.listAll();
        res.status(200).send(services);
    } catch (err) {
        console.error("Error while listing services: ", err);
        res.status(500).send({
            message: err.message || "Some error occurred while listing services."
        });
    }
};
