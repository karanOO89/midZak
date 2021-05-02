/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router = express.Router();
//const productFunctions = require("../db/products_queries")

module.exports = (db) => {

  // router.use((req, res, next) => {
  //   if(!req.cookies.user_id) {
  //     res.redirect('/login');
  //   }
  //   next;
  // });

  // GET /products
  router.get('/', (req, res) => {
    db.query('SELECT * From products;')
      .then(data => {
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // POST /products
   router.post('/', (req, res) => {
    let query = `INSERT INTO products
      (name,
      description,
      price,
      stock,
      thumbnail
      ) VALUES($1,$2,$3,$4,$5)`;

    const values= [
      req.body.product_name,
      req.body.description,
      Number(req.body.price),
      Number(req.body.stock),
      req.body.thumbnail
    ];
    db.query(query,values)
     .then((res) => {
       res.rows;
     })
     .catch(err => {
       res
         .status(500)
         .json({ error: err.message });
     });
  })

  //GET /products/:id
  router.get('/:id', (req, res) => {
    db.query('SELECT * From products WERE id = $1', [id])
    .then((res) => {
      res.rows[0];
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
}
