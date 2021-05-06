/*
  This file create QuerY Strings and Value Array for That
 */

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const messages = require('./messages');
//const imageToBase64 = require('image-to-base64');

router.use((req, res, next) => {
  if(!req.session.user_id) {
    res.redirect('/login');
  }
  next();
});

// SET multer STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })

module.exports = (db) => {

  // GET /products/:id
  // View single product
  router.get('/:id', (req, res) => {
    db.query('SELECT * From products WHERE id = $1', [req.params.id])
    .then((data) => {
      console.log('data', data)
      if(data.rows[0]){
        const templateVars = {
          product: data.rows[0]
        };
        res.render('product-page', templateVars);
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
      res
          .status(500)
          .json({ error: err.message });
    });
  })

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

  //POST /products/delete/:id
  // router.get('/:id', (req, res) => {
  //   let queryString = `SELECT * From products WHERE id = $1`;
  //   const queryParams= [
  //     req.body.product_name,
  //     req.body.description,
  //     Number(req.body.price),
  //     Number(req.body.stock),
  //     req.file
  //   ];
  //   db.query(queryString,queryParams)
  //   .then((data) => {
  //     data.rows[0];
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });
  // });

  return router;
}
