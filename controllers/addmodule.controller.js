// controllers/moduleController.js
const Module = require('../models/addmodule.model'); 

exports.addModule = async (req, res) => {
    try {
        const {
            organization_id,
            name,
            module_type,
            centre_id,
            sports_id,
            mobile,
            alternate_number,
            address_line1,
            address_line2,
            country,
            state,
            gst_no,
            website,
            email_id,
            city,
            pincode,
            use_centre_data_for_invoice,
            use_centre_timings,
            weekdays_from,
            weekdays_to,
            saturday_from,
            saturday_to,
            sunday_from,
            sunday_to,
            select_days,
            due_date
        } = req.body;

        const newModule = await Module.create({
            organization_id,
            name,
            module_type,
            centre_id,
            sports_id,
            mobile,
            alternate_number,
            address_line1,
            address_line2,
            country,
            state,
            gst_no,
            website,
            email_id,
            city,
            pincode,
            use_centre_data_for_invoice,
            use_centre_timings,
            weekdays_from,
            weekdays_to,
            saturday_from,
            saturday_to,
            sunday_from,
            sunday_to,
            select_days,
            due_date
        });

        res.status(201).json({
            message: 'Module added successfully',
            module: newModule
        });
    } catch (error) {
        console.error('Error adding module:', error);
        res.status(500).json({
            message: 'Error adding module',
            error: error.message
        });
    }
};


exports.getModule = async (req, res) => {
    try {
        const { id } = req.params;

        const module = await Module.findByPk(id);
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        res.status(200).json({
            message: 'Module retrieved successfully',
            module
        });
    } catch (error) {
        console.error('Error retrieving module:', error);
        res.status(500).json({
            message: 'Error retrieving module',
            error: error.message
        });
    }
};
