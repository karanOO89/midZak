const express = require('express');
const router  = express.Router();
module.exports = (db) => {
  router.get("/", (req, res) => {
    
    const mainQuery = `SELECT DISTINCT(products.*) ,favourites.id as fav_id, favourites.user_id as user_id ,favourites.product_id as fav_prod_id FROM products 
    LEFT OUTER JOIN favourites ON favourites.product_id = products.id 
    LEFT OUTER JOIN users ON users.id = favourites.user_id`;
    if(req.query.minPrice && req.query.maxPrice){
      const priceAppendQuery = mainQuery + ` Where price >= $1 AND price <= $2;`
      
      db.query(priceAppendQuery,[req.query.minPrice , req.query.maxPrice])
    }
    if(req.query.minPrice){
      const priceAppendQuery = mainQuery + ` Where price <= $1`

    }
    
  db.query(`SELECT DISTINCT(products.*) ,favourites.id as fav_id, favourites.user_id as user_id ,favourites.product_id as fav_prod_id FROM products 
            LEFT OUTER JOIN favourites ON favourites.product_id = products.id 
            LEFT OUTER JOIN users ON users.id = favourites.user_id
             ;`) 
  .then(data => {
    const templateVars = {
      data:data.rows

    };
// console.log(templateVars);
        res.render("index",templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
