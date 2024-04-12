var express = require('express');
var router = express.Router();
const uploadImage = require("../middlewares/multer");
const dishesControllers = require("../controllers/dishesControllers");



router.get('/addDish/:id', dishesControllers.viewAddDish);


router.post('/addDish/:id', uploadImage("dishes"), dishesControllers.addDish)
module.exports = router;


router.get("/editDish/:id/:restaurant_id", dishesControllers.viewEditDish)


router.post("/editDish/:id/:restaurant_id", uploadImage("dishes"), dishesControllers.editDish)


router.get("/deleteDish/:id/:restaurant_id", dishesControllers.deleteDish)