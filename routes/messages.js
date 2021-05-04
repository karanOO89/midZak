
/*
 * All routes for Messages are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // router.use((req, res, next) => {
  //   if(!req.cookies.user_id) {
  //     res.redirect('/login');
  //   }
  //   next;
  // });

  // GET /messages
  router.get('/', (req, res) => {
    let queryString = `SELECT * From messages LIMIT 10;`;
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

  // GET /messages/search
  router.get('/search', (req, res) => {
    let queryString = `SELECT * From messages LIMIT 10;`;
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
  // POST /messages
    router.post('/', (req, res) => {
    let query = `INSERT INTO messages
      (message, sender_id, receiver_id, product_id, thread_master_id)
        VALUES($1,$2,$3,$4,$5)`;
    const values= [
      req.body.message,
      Number(req.body.sender_id),
      Number(req.body.reeceiver_id),
      Number(req.body.product_id),
      Number(req.body.threat_master_id)
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
  return router;
}

