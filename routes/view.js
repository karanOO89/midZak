const express = require('express');
const router  = express.Router();
const app        = express();
app.use(express.static("uploads"));
module.exports = (db) => {
  router.get("/view", (req, res) => {
    db.query(`SELECT thumbnail FROM products;`)
      .then(data => {
        const templateVars = {
           data: data.rows
          };
        res.render("products_listing",templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
