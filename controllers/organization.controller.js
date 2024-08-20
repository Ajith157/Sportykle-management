const Organization = require("../models/organization.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv');
dotenv.config();

exports.create = async (req, res) => {
 
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)

  // Create a Customer
  const organization = {
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword
  };

  // Save Customer in the database
  Organization.create(organization, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else res.send(data);
  });
};

exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const organization = {
    email: req.body.email,
    password: req.body.password
  };

  // Save Customer in the database
  Organization.login(organization, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while Login."
      });
    else res.send(data);
  });
};