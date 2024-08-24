const Organization = require("../models/organization.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv');
dotenv.config();
const verifyToken=require("../Middleware/AuthMiddleware.js")
const tokenSecret = process.env.TOKEN_SECRET || 'default_secret_key';



exports.signup = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the organization
        const organization = await Organization.create({
            name,
            email,
            mobile,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'Organization created successfully',
            organization
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating organization',
            error: error.message
        });
    }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const organization = await Organization.findOne({ where: { email } });

      if (!organization) {
          return res.status(404).json({ message: 'Organization not found' });
      }

      const isMatch = await bcrypt.compare(password, organization.password);

      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: organization.id, email: organization.email },
        tokenSecret,
        { expiresIn: '1h' }
    );

      res.status(200).json({
          message: 'Login successful',
          token,
          organization
      });
  } catch (error) {
      res.status(500).json({
          message: 'Error during login',
          error: error.message
      });
  }
};

exports.addOrganization = async (req, res) => {

  
  const { organizationId } = req.body;
  const updateData = req.body;


  

  try {
      // Find the organization
      const organization = await Organization.findByPk(organizationId);

      console.log(organization,'222');
      

      if (!organization) {
          return res.status(404).json({
              message: 'Organization not found'
          });
      }

      // Update the organization details
      await organization.update(updateData);

      res.status(200).json({
          message: 'Organization updated successfully',
          organization
      });
  } catch (error) {
      res.status(500).json({
          message: 'Error updating organization',
          error: error.message
      });
  }
};



exports.editOrganization = async (req, res) => {
  const { organizationId, ...updateData } = req.body; 

  try {
    
    const organization = await Organization.findByPk(organizationId);

    if (!organization) {
      return res.status(404).json({
        message: 'Organization not found'
      });
    }

    if (updateData.email) {
      return res.status(400).json({
        message: 'Email cannot be updated'
      });
    }

   
    await organization.update(updateData);

    res.status(200).json({
      message: 'Organization updated successfully',
      organization
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating organization',
      error: error.message
    });
  }
};
