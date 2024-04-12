const connection = require('../config/db');
const bcrypt = require('bcrypt');

class IndexControllers {
    viewAllRestaurants = (req, res) => {
      let sql = "SELECT * FROM restaurant WHERE restaurant_isdeleted = 0"
      connection.query(sql, (err, result) => {
          if(err) throw err;
          res.render('index', {result})
      })
    }

    viewAbout = (req, res) => {
        res.render("about")
    }

    restaurantRegister = (req, res) => {
      res.render('registerForm')
    }

    createRestaurant = (req, res) => {
      console.log(req.body);
      const {restaurant_name, style, email, phone_number, password, password2, restaurant_description} = req.body;
      if(
          restaurant_name === "" ||
          style === ""||
          email === ""||
          phone_number === "" ||
          password === "" ||
          restaurant_description === ""
          ){
              return res.render("registerForm", {message: "Rellene todos los campos"})
          }

      if(password !== password2){
          return res.render("registerForm", {message: "Validación de contraseña incorrecta"})
      }

      //encriptar contarseña
      bcrypt.hash(password, 10, function(err, hash){
        if(err) throw err;
        
        let sql = `INSERT INTO restaurant (restaurant_name, style, email, phone_number, password, restaurant_description, restaurant_img) VALUES ("${restaurant_name}","${style}","${email}", "${phone_number}", "${hash}", "${restaurant_description}", "sinfoto.png")`
    
        if(req.file != undefined){
            let img = req.file.filename;
            sql = `INSERT INTO restaurant (restaurant_name, style, email, phone_number, password, restaurant_description, restaurant_img) VALUES ("${restaurant_name}", "${style}", "${email}", "${phone_number}", "${hash}", "${restaurant_description}", "${img}")`
        }
          connection.query(sql, (err, result) => {
                if(err){
                    if(err.errno == 1062){
                        return res.render("registerForm", {message:"Email ya resgistrado"})
                    }else{
                        throw err;
                    }
            } 
            res.redirect("/");
          })
    })
    }

    viewEditRestaurant = (req, res) => {
        let id = req.params.id
        let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} AND restaurant_isdeleted = 0`
  
        connection.query(sql, (err, result) => {
          if(err) throw err;
  
          res.render("editRestaurant", { result })
        })
  
      }

    editRestaurant = (req, res) => {
        let id = req.params.id;
        const { restaurant_name, style, phone_number, restaurant_description } = req.body;
        let sql = `UPDATE restaurant SET restaurant_name = "${restaurant_name}", style = "${style}", phone_number = "${phone_number}", restaurant_description = "${restaurant_description}" WHERE restaurant_id = ${id}`
  
        if(req.file != undefined){
          let img = req.file.filename;
          sql = `UPDATE restaurant SET restaurant_name = "${restaurant_name}", style = "${style}", phone_number = "${phone_number}", restaurant_description = "${restaurant_description}", restaurant_img = "${img}" WHERE restaurant_id = ${id}`
        }
  
        connection.query(sql, (err, result) => {
          if(err) throw err;
          res.redirect(`/oneRestaurant/${id}`)
        })
      }

    viewOneRestaurant = (req, res) => {
      let id = req.params.id
      let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} AND restaurant_isdeleted = 0`
      let sql_dish = `SELECT * FROM dish WHERE restaurant_id = ${id} AND dish_isdeleted = 0`
      
      connection.query(sql, (err, result) =>{
          if(err) throw err;
          connection.query(sql_dish, (err_dish, result_dish) =>{
              if(err_dish) throw err_dish;
              res.render("oneRestaurant", {result, result_dish})
          })
      })
    }

}

module.exports = new IndexControllers;