const Paymentmode = require("../models/paymentmode.model.js");

exports.add = async (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const data = {
    orgid: req.body.organizationid,
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo
  };

 
  Paymentmode.add(data, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else res.send(data);
  });
};

exports.list = async (req, res) => {
  

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const data = {
    orgid: req.body.organizationid,
  };


  Paymentmode.list(data, (err, data) => {

    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else res.send(data);
   
    
  });
};