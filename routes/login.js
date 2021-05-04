//   Sign In Page  //


const express = require('express');
const router = express.Router();
const session = require('express-session');
router.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  }));


module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("login");
  });

  //   Log In Handler
  router.post("/", (req, res) => {
    let queryString = `SELECT * From users WHERE email=$1;`;
    let queryParams =[req.body.email];
    db.query(queryString,queryParams)
      .then(data => {
        if(data.rows.length == 0) {
          req.body.userType === 'admin' ? user_type_id = 1 : user_type_id = 2;
          let queryString = `INSERT INTO users (name, email, password, user_type_id) VALUES ($1, $2, $3, $4) RETURNING id;`;
          let queryParams =[req.body.name, req.body.email, req.body.password, user_type_id];
          db.query(queryString,queryParams)
          .then(data => {
            console.log("id:", data.rows);
            req.session.user_id = data.rows[0].id;
            res.render("index");
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
        } else {
          console.log('result:',data.rows);
          req.session.user_id = data.rows[0].id;
          res.render("index");
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
   });
  return router;
};
