/*
  This file create QuerY Strings and Value Array for That
 */

const express = require("express");
const router = express.Router();
// const multer  = require('multer');
// const messages = require('./messages');
//const imageToBase64 = require('image-to-base64');

router.use((req, res, next) => {
  if(!req.session.user_id) {
    res.redirect('/login');
  }
  next();
});



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

  // GET /products
  router.get('/', (req, res) => {
    //res.render("product_upload");
    let queryString = `SELECT * From products LIMIT 10;`;
    let queryParams =[];
    console.log(reg,body)

    if (req.body.owner_id) {
      queryParams.push(req.body.owner_id);
      queryString += `WHERE user_id = $${queryParams.length} `;
    };
    if (req.body.price) {
      queryParams.push(req.body.price);
      queryString += `AND ORDER BY products.price $${queryParams.length}`;
    };

    queryParams.push(req.body.limit);
    queryString += `
    LIMIT $${queryParams.length};
    `;
    db.query(queryString,queryParams)
      .then(data => {
        console.log(req.params)
        const templateVars = {
          data: data.rows
        };
        //console.log("hhhh", data.rows);

        res.render("index", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // POST /products/new
   router.post('/new', upload.single("thumbnail"), (req, res) => {
    res.render("product_upload");
    const obj = Object.assign({},req.body);
    console.log(obj);
    let query = `INSERT INTO products
    (name,
      description,
      price,
      stock,
      user_id,
      thumbnail
      ) VALUES($1,$2,$3,$4,$5,$6) RETURNING id;`;

    const values= [
      obj.product_name,
      obj.description,
      Number(obj.price),
      Number(obj.stock),
      req.session.user_id,
      req.file.path
    ];
    db.query(query, values)
      .then((data) => {
        db.query(`SELECT * FROM products WHERE id = ${data.rows[0].id};`)
        .then((data) => {
          const templateVars = {
            product: data.rows[0]
          };
          res.render("product-page", templateVars);
         //console.log("inside query:", data.rows[0]);
        });
      })
     .catch(err => {
       res
         .status(500)
         .json({ error: err.message });
                console.log(values);

     });
  })

  //GET /products/search
  router.post('/search', (req, res) => {
    let queryString = `SELECT * From products
    WHERE products.name LIKE $1 OR
    products.description LIKE $1;`;
    const queryParams= [
      `%${req.body.search}%`
    ];
    console.log("before query:", req.params, req.body);
    db.query(queryString,queryParams)
    .then((data) => {
      console.log(data.rows)
      const templateVars = {
        data: data.rows
      };
      res.render("index", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //GET /products/search
  router.post('/filter', (req, res) => {
    let queryString = `SELECT * From products
    WHERE products.price LIKE $1 OR
    products.description LIKE $1;`;
    const queryParams= [
      `%${req.body.search}%`
    ];
    console.log("before query:", req.params, req.body);
    db.query(queryString,queryParams)
    .then((data) => {
      console.log(data.rows)
      const templateVars = {
        data: data.rows
      };
      res.render("index", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

 

  return router;
};
