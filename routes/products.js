/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const multer  = require('multer');

// SET multer STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + ".png")
  }
})

const upload = multer({ storage })

//const productFunctions = require("../db/products_queries")


module.exports = (db) => {

  router.use((req, res, next) => {
    if(!req.session.user_id) {
      res.redirect('/login');
    }
    next();
  });

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
  // router.get('/search', (req, res) => {
  //   let queryString = `SELECT * From products LIMIT 10;`;
  //   let queryParams =[];
  //   db.query(queryString,queryParams)
  //     .then(data => {
  //       console.log(req.params)
  //       const products = data.rows;
  //       res.json({ products });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  // POST /new-products
   router.post('/:new', upload.single("thumbnail"), (req, res) => {
    const obj = Object.assign({},req.body);
    console.log(obj);
    let query = `INSERT INTO products
      (name,
      description,
      price,
      stock,
      user_id,
      thumbnail
      ) VALUES($1, $2, $3, $4, $5, $6)`;
    const values= [
      obj.product_name,
      obj.description,
      Number(obj.price),
      Number(obj.stock),
      req.session.user_id,
      req.file.path
    ];
    //console.log("product user:",req.session.user_id, values);
    db.query(query,values)
     .then((data) => {
      //console.log(data.rows);
      res.redirect("/");
     })
     .catch(err => {
       res
         .status(500)
         .json({ error: err.message });
                console.log(values);

     });
  })

  //GET /products/search
  router.get('/:search', (req, res) => {
    let queryString = `SELECT * From products
    WHERE products.name LIKE $1 OR
    products.description LIKE $1;`;
    const queryParams= [
      `%${req.query.search[0]}%`
    ];
    console.log("before query:",req.query.search[0]);
    db.query(queryString,queryParams)
    .then((data) => {
      console.log("after query", data.rows);
      res.render("product-page", data.rows)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
}




