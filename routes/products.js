/*
  This file create QuerY Strings and Value Array for That
 */

const express = require("express");
const router = express.Router();
// const multer  = require('multer');
// const messages = require('./messages');
//const imageToBase64 = require('image-to-base64');

// SET multer STORAGE
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

// var upload = multer({ storage: storage })

module.exports = (db) => {
  // GET /products/:id
  // View single product
  router.get("/:id", (req, res) => {
    db.query("SELECT * From products WHERE id = $1", [req.params.id])
      .then((data) => {
        if (data.rows) {
          const templateVars = {
            product: data.rows[0],
          };
          res.render("product-page", templateVars);
        }
      })
      .catch((err) => {
        res.redirect("/");
      });
  });

  router.post("/:id/delete", (req, res) => {
    // console.log(req.body.productId);
    db.query(`DELETE FROM products WHERE id = $1`, [req.body.productId])
      .then(() => {
        // res.json(200,"ok");
        // console.log("data",data)
        return res.redirect("/");
      })
      .catch((err) => {
        console.log("err",err)
        res.status(500).json({ error: err.message });
      });
  });
  //

  // PUT /products/:id
  // Edit a single product
  // router.put('/:id', (req, res) => {

  // // router.use((req, res, next) => {
  // //   if(!req.session.user_id) {
  // //     res.redirect('/login');
  // //   }
  // //   next();
  // // });
  // });
  // GET /products
  // router.get('/', (req, res) => {
  //   res.render("product_upload");
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

  // // GET /products/search
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
  // POST /products
  //  router.post('/', upload.single("thumbnail"), (req, res) => {
  //   const obj = Object.assign({},req.body);
  //   console.log(obj);
  //   let query = `INSERT INTO products
  //     (name,
  //     description,
  //     price,
  //     stock,
  //     user_id,
  //     thumbnail
  //     ) VALUES($1, $2, $3, $4, $5, $6)`;

  //     // VALUES($1,$2,$3,$4,$5)`;
  //   // const values= [
  //   //   req.body.product_name,
  //   //   req.body.description,
  //   //   Number(req.body.price),
  //   //   Number(req.body.stock),
  //   //   req.file
  //   // ];

  //   const values= [
  //     obj.product_name,
  //     obj.description,
  //     Number(obj.price),
  //     Number(obj.stock),
  //     req.session.user_id,
  //     req.file.path
  //   ];
  //   //console.log("product user:",req.session.user_id, values);
  //   db.query(query,values)
  //    .then((data) => {
  //     //console.log(data.rows);
  //     res.redirect("/");
  //    })
  //    .catch(err => {
  //      res
  //        .status(500)
  //        .json({ error: err.message });
  //               console.log(values);

  //    });
  // })

  //GET /products/edit/:id
  // router.get("/:id", (req, res) => {
  //   let queryString = `SELECT * From products WHERE id = $1`;
  //   const queryParams = [
  //     req.body.product_name,
  //     req.body.description,
  //     Number(req.body.price),
  //     Number(req.body.stock),
  //     req.file,
  //   ];
  //   db.query(queryString, queryParams)
  //     .then((data) => {
  //       data.rows[0];
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  return router;
};
