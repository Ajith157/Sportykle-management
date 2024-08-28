const Organization=require('../models/organization.model')
const sequelize = require('../models/sequelize'); 
const Member = require('../models/addmember.model');
const Center = require('../models/addcentre.model');
const Sports = require('../models/addsports.model'); 
const Module = require('../models/addmodule.model');
const Batch = require('../models/addbatch.model'); 
const Service = require('../models/service.model');

// exports.addMember = async (req, res) => {
//     const transaction = await sequelize.transaction();
//     try {
//         const {
//             organization_id, profile_photo, name, gender, dob, mobile_number, alternative_number,
//             email, address, documents, date_of_joining, referral, center_id, sports_id,
//             module_id, batch_id, plan_name, assign_staff, select_days, services_id,
//             due_date, fee_type, billing_cycle, invoice_type, registration_fee,
//             discount_type, discount_application, discount, plan_amount, service_amount,
//             total
//         } = req.body;

//         console.log('Received request body:', req.body);

//         // Validate required fields
//         if (!organization_id || !name || !dob || !mobile_number || !email || !address || !date_of_joining || !center_id || !sports_id || !module_id || !batch_id || !plan_name || !assign_staff || !select_days || !services_id || !due_date || !fee_type || !billing_cycle || !invoice_type || !registration_fee || !plan_amount || !service_amount || !total) {
//             console.log('Missing required fields');
//             await transaction.rollback();
//             return res.status(400).json({ message: 'All required fields must be provided.' });
//         }

//         // Fetch and validate the related master tables including organization
//         const [organization, center, sports, module, batch, service] = await Promise.all([
//             Organization.findByPk(organization_id, { transaction }),
//             Center.findByPk(center_id, { transaction }),
//             Sports.findByPk(sports_id, { transaction }),
//             Module.findByPk(module_id, { transaction }),
//             Batch.findByPk(batch_id, { transaction }),
//             Service.findByPk(services_id, { transaction })
//         ]);

//         if (!organization || !center || !sports || !module || !batch || !service) {
//             console.log('Invalid references to master tables');
//             await transaction.rollback();
//             return res.status(400).json({ message: 'Invalid references to master tables.' });
//         }

//         const newMember = await Member.create({
//             organization_id,
//             profile_photo,
//             name,
//             gender,
//             dob,
//             mobile_number,
//             alternative_number,
//             email,
//             address,
//             documents,
//             date_of_joining,
//             referral,
//             center_id,
//             sports_id,
//             module_id,
//             batch_id,
//             plan_name,
//             assign_staff,
//             select_days,
//             services_id,
//             due_date,
//             fee_type,
//             billing_cycle,
//             invoice_type,
//             registration_fee,
//             discount_type,
//             discount_application,
//             discount,
//             plan_amount,
//             service_amount,
//             total
//         }, { transaction });

//         await transaction.commit();
//         res.status(201).json({ message: 'Member successfully added.', member: newMember });
//     } catch (error) {
//         await transaction.rollback();
//         console.error('Error adding member:', error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// };

exports.addMember = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const {
            organization_id, profile_photo, name, gender, dob, mobile_number, alternative_number,
            email, address, documents, date_of_joining, referral, center_id, sports_id,
            module_id, batch_id, plan_name, assign_staff, select_days, services_id,
            due_date, fee_type, billing_cycle, invoice_type, registration_fee,
            discount_type, discount_application, discount, plan_amount, service_amount,
            // total is not needed in the request body as we will calculate it
        } = req.body;

        console.log('Received request body:', req.body);

        // Validate required fields
        if (!organization_id || !name || !dob || !mobile_number || !email || !address || !date_of_joining || !center_id || !sports_id || !module_id || !batch_id || !plan_name || !assign_staff || !select_days || !services_id || !due_date || !fee_type || !billing_cycle || !invoice_type || !registration_fee || !plan_amount || !service_amount) {
            console.log('Missing required fields');
            await transaction.rollback();
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        // Fetch and validate the related master tables including organization
        const [organization, center, sports, module, batch, service] = await Promise.all([
            Organization.findByPk(organization_id, { transaction }),
            Center.findByPk(center_id, { transaction }),
            Sports.findByPk(sports_id, { transaction }),
            Module.findByPk(module_id, { transaction }),
            Batch.findByPk(batch_id, { transaction }),
            Service.findByPk(services_id, { transaction })
        ]);

        if (!organization || !center || !sports || !module || !batch || !service) {
            console.log('Invalid references to master tables');
            await transaction.rollback();
            return res.status(400).json({ message: 'Invalid references to master tables.' });
        }

        // Calculate the total amount based on discount type
        let discountAmount = parseFloat(discount) || 0;
        let totalAmount = parseFloat(plan_amount) + parseFloat(service_amount);

        if (discount_type === 'percentage') {
            // Apply percentage discount
            const discountPercentage = discountAmount / 100;
            discountAmount = totalAmount * discountPercentage;
        }

        const calculatedTotal = totalAmount - discountAmount;

        const newMember = await Member.create({
            organization_id,
            profile_photo,
            name,
            gender,
            dob,
            mobile_number,
            alternative_number,
            email,
            address,
            documents,
            date_of_joining,
            referral,
            center_id,
            sports_id,
            module_id,
            batch_id,
            plan_name,
            assign_staff,
            select_days,
            services_id,
            due_date,
            fee_type,
            billing_cycle,
            invoice_type,
            registration_fee,
            discount_type,
            discount_application,
            discount: discountAmount, // Store the applied discount amount
            plan_amount,
            service_amount,
            total: calculatedTotal // Use the calculated total
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ message: 'Member successfully added.', member: newMember });
    } catch (error) {
        await transaction.rollback();
        console.error('Error adding member:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
