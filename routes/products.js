/*
  This file create QuerY Strings and Value Array for That
 */

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const messages = require('./messages');
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

module.exports = (db) => {

  // GET /products/:id
  // View single product
  router.get('/:id', (req, res) => {
    db.query('SELECT * From products WHERE id = $1', [req.params.id])
    .then((data) => {
      if(data.rows[0]){
        const templateVars = {
          product: data.rows[0]
        };
        res.render('product-page', templateVars);
      } else {
        res.redirect("/");
      }
    })
    .catch(err => {
      res.redirect("/");
    });
  });

  // GET /products/:id/message
  router.get('/:id/messages', (req, res) => {
    db.query('SELECT * From products WHERE id = $1', [req.params.id])
    .then((data) => {
      if(data.rows[0]){

        const product = data.rows[0];

        //product ID
        console.log(product.id)
        // sender ID
        // This should be logged in user ID

        const templateVars = {
          product: product
        };
        res.render('product-message', templateVars);
      } else {
        res.redirect("/");
      }
    })
    .catch(err => {
      res.redirect("/");
    });
  })

  // PUT /products/:id
  // Edit a single product
  router.put('/:id', (req, res) => {

  });

  // GET /products
  router.get('/', (req, res) => {
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
  });

  return router;
}
