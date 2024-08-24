module.exports = app => {

	const organization = require("../controllers/organization.controller.js");
	const paymentmode = require("../controllers/paymentmodes.controller.js");
	const services=require('../controllers/service.controller.js')
	const plans=require("../controllers/plan.controller.js")
	const workouts=require("../controllers/workouts.controller.js")
	const workoutNames=require('../controllers/workouts.controller.js')
	const dietPlans =require('../controllers/dietPlans.controller.js')
	const AddMember=require('../controllers/addmember.controller.js')
    const GetMember=require("../controllers/addmember.controller.js")
	const authController=require("../controllers/organization.controller.js")
    const organizationController=require("../controllers/organization.controller.js")
	const authMiddleware=require("../Middleware/AuthMiddleware.js")
	
	

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

	
  



	  app.post('/api/signup', authController.signup);

	  app.post('/api/login', authController.login);

	  app.put('/api/add-organization', organizationController.addOrganization);

	  app.put('/api/edit-organization', organizationController.editOrganization);




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

    //Add Diet plans
	app.post('/api/add-diet-plan', dietPlans.add);

    //List out the diet plans
	app.get('/api/diet-plans', dietPlans.list);

	//Update diet plans
	app.put('/api/diet-plans/:id', dietPlans.update);

	//delete diet plans
	app.delete('/api/diet-plans/:id', dietPlans.delete);








	





	




};