const express = require('express');
const router  = express.Router();
module.exports = (db) => {
  router.get("/", (req, res) => {
<<<<<<< HEAD
    let orderBy = 'ORDER BY products.price ASC';
    if(req.query.price) {
      orderBy = 'ORDER BY products.price DESC';
    }
    let sql = `SELECT DISTINCT(products.*) ,favourites.id as fav_id, favourites.user_id as user_id ,favourites.product_id as fav_prod_id FROM products
    LEFT OUTER JOIN favourites ON favourites.product_id = products.id
    ${orderBy}
    ;`;
    //  LEFT OUTER JOIN users ON users.id = favourites.user_id
    db.query(sql)
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
=======
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
            
             ;`) 
  .then(data => {
    const templateVars = {
      data: data.rows
    };
    console.log(templateVars);

        res.render("index",templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
>>>>>>> connection
  });
  return router;
};
