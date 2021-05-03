/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({});

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
   router.post('/', upload.single(`/upload/photo`), (req, res) => {
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
      req.file.buffer.toString('base64')
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


  // Single product page
  router.get("/page", (req, res) => {
    res.render("product-page");
  });

  //GET /products/:id
  router.get('/:id', (req, res) => {
    db.query('SELECT * From products WERE id = $1', [id])
    .then((data) => {
      res.json(data.rows[0]);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
}




