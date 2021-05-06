const express = require('express');
const router  = express.Router();
module.exports = (db) => {
  router.get("/", (req, res) => {
    // id: 59,
    // name: 'ss',
    // description: 'asxasxas',
    // price: 55,
    // stock: 111,
    // is_approved: false,
    // is_for_sale: false,
    // user_id: null,
    // thumbnail: '1620152227853',
    // imge_id: null
  db.query(`SELECT DISTINCT(products.*) ,favourites.id as fav_id, favourites.user_id as user_id ,favourites.product_id as fav_prod_id FROM products 
            LEFT OUTER JOIN favourites ON favourites.product_id = products.id 
            LEFT OUTER JOIN users ON users.id = favourites.user_id
            ORDER BY products.price
             ;`) 
  .then(data => {
    const templateVars = {
      data: data.rows
    };

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
