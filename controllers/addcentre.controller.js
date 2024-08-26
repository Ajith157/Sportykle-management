// controllers/centerController.js
const { Module } = require('../models/sequelize'); 
const Center=require('../models/addcentre.model')
const Batch=require('../models/addbatch.model')
const Sports=require('../models/addsports.model')

// Create a new center
exports.createCenter = async (req, res) => {
    try {
        const {
            organization_id,
            profile_photo,
            centre_name,
            display_name,
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
            use_organization_data,
            weekdays_from,
            weekdays_to,
            saturday_from,
            saturday_to,
            sunday_from,
            sunday_to,
            select_days,
            map_location,
            referral,
            referral_source,
            terms_and_conditions_note
        } = req.body;

        // Create the center
        const newCenter = await Center.create({
            organization_id,
            profile_photo,
            centre_name,
            display_name,
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
            use_organization_data,
            weekdays_from,
            weekdays_to,
            saturday_from,
            saturday_to,
            sunday_from,
            sunday_to,
            select_days,
            map_location,
            referral,
            referral_source,
            terms_and_conditions_note
        });

        res.status(201).json({
            message: 'Center created successfully',
            data: newCenter
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating center',
            error: error.message
        });
    }
};




exports.createBatch = async (req, res) => {
    try {
        const {
            organization_id,
            batch_name,
            start_time,
            end_time,
            days,
            payment_collection_data,
            student_limit,
            assign_coach_staff,
            description
        } = req.body;

        // Validate input (you might want to use a validation library here)
        if (!organization_id || !batch_name || !start_time || !end_time) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        // Create a new batch
        const newBatch = await Batch.create({
            organization_id,
            batch_name,
            start_time,
            end_time,
            days,
            payment_collection_data,
            student_limit,
            assign_coach_staff,
            description
        });
       
        

        // Respond with success message and created batch
        res.status(201).json({
            message: 'Batch created successfully',
            batch: newBatch
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.addSport = async (req, res) => {
    try {
        const {
            organization_id,
            image,
            name,
            number_of_facility,
            centre,
            description
          
        } = req.body;

        // Validate required fields
        if (!organization_id || !name || !number_of_facility || !centre) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new sport record
        const newSport = await Sports.create({
            organization_id,
            image,
            name,
            number_of_facility,
            centre,
            description
            
        });

        // Respond with the success message and created record
        res.status(201).json({
            message: 'Sport added successfully',
            data: newSport
        });
    } catch (error) {
        console.error('Error adding sport:', error);
        res.status(500).json({ message: 'Server error' });
    }
};