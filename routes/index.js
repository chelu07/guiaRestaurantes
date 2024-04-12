const express = require('express');
const router = express.Router();
const indexControllers = require("../controllers/indexControllers")
const uploadImage = require('../middlewares/multer')

// Acceder a la home
//entrada localhost:3000
router.get('/', indexControllers.viewAllRestaurants );

//Acceder a about
//entrada localhost:3000/about
router.get('/about', indexControllers.viewAbout );

//abre la página con el formulario de registro
//entrada localhost:3000/register
router.get('/register', indexControllers.restaurantRegister)

//recoge los datos del formulario de registros
//localhost:3000/register
router.post('/register', uploadImage("restaurants"),indexControllers.createRestaurant)

// Ver formulario de edición
router.get("/editRestaurant/:id", indexControllers.viewEditRestaurant)

// recoje los datos del formulario de edición para guardar en bd
router.post("/editRestaurant/:id", uploadImage("restaurants"), indexControllers.editRestaurant)

//abre la página con info de un restaurante determinado con todas sus platos
//localhost:3000/oneRestaurant/:id
router.get("/oneRestaurant/:id", indexControllers.viewOneRestaurant)


module.exports = router;
