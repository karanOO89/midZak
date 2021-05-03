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
    let query = `SELECT * From products WEHER
      id in $1 AND
      name in $2 AND
      description like '%$3 %' AND
      price >= $4 AND price < $5 AND
      stock > $6  AND
      is_approved = ":false,"is_for_sale":true,"user_id":1,"thumbnail":"","imge_id":0}

     ;`
    db.query()
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
