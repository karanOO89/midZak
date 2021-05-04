/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const multer  = require('multer');
//const imageToBase64 = require('image-to-base64');

// SET multer STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

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
    res.render("product_upload");
    let queryString = `SELECT * From products LIMIT 10;`;
    let queryParams =[];
    db.query(queryString,queryParams)
      .then(data => {
        console.log(req.params)
        const products = data.rows;
        res.json({ products });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET /products/search
  router.get('/search', (req, res) => {
    let queryString = `SELECT * From products LIMIT 10;`;
    let queryParams =[];
    db.query(queryString,queryParams)
      .then(data => {
        console.log(req.params)
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
   router.post('/', upload.single("thumbnail"), (req, res) => {
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
      req.file
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

  //GET /products/edit/:id
  router.get('/:id', (req, res) => {
    let queryString = `SELECT * From products WHERE id = $1`;
    const queryParams= [
      req.body.product_name,
      req.body.description,
      Number(req.body.price),
      Number(req.body.stock),
      req.file
    ];
    db.query(queryString,queryParams)
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




