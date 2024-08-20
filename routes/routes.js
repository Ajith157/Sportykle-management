module.exports = app => {

	const organization = require("../controllers/organization.controller.js");
	const paymentmode = require("../controllers/paymentmodes.controller.js");
	const services=require('../controllers/service.controller.js')
	const plans=require("../controllers/plan.controller.js")
	const workouts=require("../controllers/workouts.controller.js")
	const workoutNames=require('../controllers/workouts.controller.js')
	

	const jwt = require('jsonwebtoken');
  	const dotenv = require('dotenv');

  	const authenticateJWT = (req, res, next) => {
	    const authHeader = req.headers.authorization;

	    if (authHeader) {
	        const token = authHeader.split(' ')[1];

	        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
	            if (err) {
	                return res.sendStatus(403);
	            }

	            req.user = user;
	            next();
	        });
	    } else {
	        res.sendStatus(401);
	    }
	};

	// Create a new Organization
  	app.post("/api/organization", organization.create);

  	// Staff Login
  	app.post("/api/login", organization.login);

  	// Payment Modes
  	app.post("/api/add-paymentmode", paymentmode.add);

  	app.post("/api/get-paymentmodes", paymentmode.list);

	//Add services
    
	app.post("/api/add-service",services.add)

	app.get("/api/get-services", services.listAll);

	
	//Add plan 

	app.post("/api/add-plan", plans.add);

	app.get("/api/get-plans", plans.listAll)

	
	//Add workout 

	app.post('/api/add-workout', workouts.add);

    app.get('/api/workout-names', workouts.listAll);

	//Updata workout data
    app.put('/api/edit-workout/:id', workouts.edit);

	//Delete Workout data
    app.delete('/api/delete-workout/:id', workouts.delete);




	




};