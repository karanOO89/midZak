const express = require("express");
const router = express.Router();

module.exports = (db) => {
   router.post("/", (req, res) => {
    const body = req.body;

    let thumbnail = req.files.thumbnail;
    console.log(thumbnail)
    let uploadPath = __dirname + "/upload/" + thumbnail.name.replace(/\s+/g, '');
    thumbnail.mv(uploadPath, function (err) {

      let query = `INSERT INTO products
      (name, 
        description, 
        price,
        stock, 
        thumbnail 
        ) VALUES($1,$2,$3,$4,$5)`;
        
      const values = [
        body.product_name,
        body.description,
        body.price,
        body.stock,
        uploadPath
      ];
      console.log(values);
      db.query(query, values)
      .then((data) => {
        const upload = data.rows;
        res.redirect("/view");
        // res.render("products_listing", { upload });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
        });
    
    });
    
    router.get("/", (req, res) => {
      res.render("product_upload");
    });
    return router;
  };