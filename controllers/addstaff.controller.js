const Staff = require('../models/addstaff.model'); // Ensure the correct path is used
const bcrypt = require('bcrypt');

exports.addStaff = async (req, res) => {
    try {
      const {
        organization_id, name, gender, dob, date_of_joining, mobile, alternate_mobile, email,
        address, documents, payment_term, profit_share_type, profit_share_value,
        crm_commission_type, crm_commission_value, service_commission_type, service_commission_value,
        late_penalty, deduct_salary_for_absent, select_days, working_time_from, working_time_to,
        notes, staff_category, enable_admin_access, username, password, profile_photo
      } = req.body;
  
      if (!name || !email || !mobile || !dob || !password) {
        return res.status(400).json({ message: 'Please fill all required fields.' });
      }
  
      // Validate the types of profit share, CRM commission, and service commission
      if (!['percentage', 'amount'].includes(profit_share_type) || 
          !['percentage', 'amount'].includes(crm_commission_type) || 
          !['percentage', 'amount'].includes(service_commission_type)) {
        return res.status(400).json({ message: 'Invalid commission type. Must be "percentage" or "amount".' });
      }
  
      // Validate the value fields to ensure they are provided when needed
      if ((profit_share_type === 'percentage' && profit_share_value == null) ||
          (crm_commission_type === 'percentage' && crm_commission_value == null) ||
          (service_commission_type === 'percentage' && service_commission_value == null)) {
        return res.status(400).json({ message: 'Percentage values are required when the type is "percentage".' });
      }
  
      // Validate select_days
      if (select_days && !Array.isArray(select_days)) {
        return res.status(400).json({ message: 'select_days must be an array of strings.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new staff record
      const newStaff = await Staff.create({
        organization_id, name, gender, dob, date_of_joining, mobile, alternate_mobile, email,
        address, documents, payment_term,
        profit_share_type, profit_share_value,
        crm_commission_type, crm_commission_value,
        service_commission_type, service_commission_value,
        late_penalty, deduct_salary_for_absent, select_days, working_time_from, working_time_to,
        notes, staff_category, enable_admin_access, username, password: hashedPassword,
        profile_photo 
      });
  
      res.status(201).json({ message: 'Staff added successfully', staff: newStaff });
  
    } catch (error) {
      console.error('Error adding staff:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

exports.getStaffById = async (req, res) => {
    try {
      const { id } = req.params;
      const staffMember = await Staff.findByPk(id); 
  
      if (!staffMember) {
        return res.status(404).json({ message: 'Staff not found' });
      }
  
      res.status(200).json({ staff: staffMember });
    } catch (error) {
      console.error('Error fetching staff by ID:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


  exports.editStaff = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        organization_id, name, gender, dob, date_of_joining, mobile, alternate_mobile, email,
        address, documents, payment_term, profit_share_type, profit_share_value,
        crm_commission_type, crm_commission_value, service_commission_type, service_commission_value,
        late_penalty, deduct_salary_for_absent, select_days, working_time_from, working_time_to,
        notes, staff_category, enable_admin_access, username, password, profile_photo
      } = req.body;
  
      // Find the existing staff member by ID
      const staff = await Staff.findByPk(id);
      if (!staff) {
        return res.status(404).json({ message: 'Staff not found' });
      }
  
      // Validate input fields (same as in addStaff)
      if (!name || !email || !mobile || !dob) {
        return res.status(400).json({ message: 'Please fill all required fields.' });
      }
  
      if (!['percentage', 'amount'].includes(profit_share_type) || 
          !['percentage', 'amount'].includes(crm_commission_type) || 
          !['percentage', 'amount'].includes(service_commission_type)) {
        return res.status(400).json({ message: 'Invalid commission type. Must be "percentage" or "amount".' });
      }
  
      if ((profit_share_type === 'percentage' && profit_share_value == null) ||
          (crm_commission_type === 'percentage' && crm_commission_value == null) ||
          (service_commission_type === 'percentage' && service_commission_value == null)) {
        return res.status(400).json({ message: 'Percentage values are required when the type is "percentage".' });
      }
  
      if (select_days && !Array.isArray(select_days)) {
        return res.status(400).json({ message: 'select_days must be an array of strings.' });
      }
  
      // Hash the password only if it is provided
      let hashedPassword = staff.password;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
  
      // Update the staff record
      const updatedStaff = await staff.update({
        organization_id, name, gender, dob, date_of_joining, mobile,alternate_mobile, email,
        address, documents, payment_term,
        profit_share_type, profit_share_value,
        crm_commission_type, crm_commission_value,
        service_commission_type, service_commission_value,
        late_penalty, deduct_salary_for_absent, select_days, working_time_from, working_time_to,
        notes, staff_category, enable_admin_access, username, password: hashedPassword,
        profile_photo 
      });
  
      res.status(200).json({ message: 'Staff updated successfully', staff: updatedStaff });
  
    } catch (error) {
      console.error('Error updating staff:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };