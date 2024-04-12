const connection = require('../config/db')

class DishesControllers {
    
  
      viewAddDish = (req, res) => {
        let id = req.params.id;
        res.render("formAddDish", {restaurant_id:id})
      }

      addDish = (req, res) => {
        let id = req.params.id;
        const {dish_name, dish_description} = req.body;
        
        let sql = `INSERT INTO dish (dish_name, dish_description, dish_img, restaurant_id) VALUES ("${dish_name}", "${dish_description}", "sinfoto.png", "${id}")`

        if (req.file != undefined){
            let img = req.file.filename;
            sql = `INSERT INTO dish (dish_name, dish_description, restaurant_id, dish_img) VALUES ("${dish_name}", "${dish_description}", "${id}", "${img}")`
        }

        connection.query(sql, (err, result)=>{
            if(err) throw err;
            res.redirect(`/oneRestaurant/${id}`)
        })
      }

      viewEditDish = (req, res) => {
        let id = req.params.id
        let sql = `SELECT * FROM dish WHERE dish_id = ${id} AND dish_isdeleted = 0`

        connection.query(sql, (err, result) => {
          if(err) throw err;

          res.render("editDish", { result })
        })
      }

      editDish = (req, res) => {
        let id = req.params.id;
        const {dish_name, dish_description} = req.body;
        let restaurant_id = req.params.restaurant_id; 
        let sql = `UPDATE dish SET dish_name = "${dish_name}", dish_description = "${dish_description}" WHERE dish_id = "${id}"`

        if(req.file != undefined){
          let img = req.file.filename;
          sql = `UPDATE dish SET dish_name = "${dish_name}", dish_description = "${dish_description}", dish_img = "${img}" WHERE dish_id = "${id}"`
        }

        connection.query(sql, (err, result) => {
          if(err) throw err;
          res.redirect(`/oneRestaurant/${restaurant_id}`)
        })

      }

      deleteDish = (req, res) => {
        let { id, restaurant_id } = req.params;
        let sql = `DELETE FROM dish WHERE dish_id = ${id}`

        connection.query(sql, (err, result) => {
          if(err) throw err;
          res.redirect(`/oneRestaurant/${restaurant_id}`)
        })

      }
}

module.exports = new DishesControllers;


//borrado total de una artwork
totalDelete = (req, res) => {
  let { id, artist_id } = req.params;
  let sql = `DELETE FROM artwork WHERE artwork_id = ${id}`

  connection.query(sql, (err, result) => {
    if(err) throw err;
    res.redirect(`/artist/oneArtist/${artist_id}`)

  })
}