const { addModule } = require("../controllers/addmodule.controller.js");

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
	const addModuleController=require('../controllers/addmodule.controller.js')
	const addCentreController=require('../controllers/addcentre.controller.js')
	const addBatchController=require('../controllers/addcentre.controller.js')
	const addSportsController=require('../controllers/addcentre.controller.js')
	const addMemberController=require('../controllers/addmember.controller.js')
	const addStaffController=require('../controllers/addstaff.controller.js')
	
	

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

	app.get("/api/get-services/:organization_id", services.listAll);


	
	//Add plan 

	app.post("/api/add-plan", plans.add);

	app.get("/api/get-plans/:organizationId", plans.listAll)

	app.patch('/api/plan/:id/toggle-status', plans.togglePlanStatus);



	
	//Add workout 

	app.post('/api/add-workout', workouts.add);

	app.get('/api/get-workouts/:organization_id', workouts.getWorkoutsByOrganizationId);


	
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

	

	
	app.post('/api/add-module',addModuleController.addModule );

	app.get('/api/get-module/:id', addModuleController.getModule);


	
	app.post('/api/add-centre',addCentreController.createCenter)

	app.put('/api/update-centre/:id', addCentreController.updateCenter);

	app.delete('/api/delete-centre/:id', addCentreController.deleteCenter);

	
	
	app.post('/api/add-batch',addBatchController.createBatch)

	app.get('/api/get-batches', addBatchController.getBatches);

	app.patch('/api/batch/:id/toggle-status', addBatchController.toggleBatchStatus);




	app.post('/api/add-sports',addSportsController.addSport)
	
	app.get('/api/get-sports/:organization_id', addSportsController.getSportsByOrganization);

	app.put('/api/update-sports/:id', addSportsController.updateSport);
    
	app.delete('/api/delete-sports/:id', addSportsController.deleteSport);

	
	
	
	app.post('/api/add-member',addMemberController.addMember)



	
	app.post('/api/add-staff',addStaffController.addStaff)

	app.get('/api/get-staff/:id',addStaffController.getStaffById)

	app.put('/api/edit-staff/:id',addStaffController.editStaff)

	




	








	





	




};