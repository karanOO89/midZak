const express = require('express');
const router  = express.Router();
const app        = express();
app.use(express.static("uploads"));
module.exports = (db) => {
  router.get("/", (req, res) => {
  db.query(`SELECT * FROM products;`)
      .then(data => {
        const templateVars = {
           data: data.rows
          };
        res.render("index",templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
