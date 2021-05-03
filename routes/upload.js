const express = require("express");
const router = express.Router();
const app        = express();
app.use(express.static("uploads"));

module.exports = (db) => {
   router.post("/", (req, res) => {
     
     const body = req.body;
     console.log(body)
     
    if (!req.files ||  Object.keys(body).length === 0 || Object.keys(req.files).length === 0 || body.product_name.length === 0
    || body.description.length === 0 || body.price.length === 0 || body.stock.length === 0 ) {
      return res.status(400).send('Please provide all information');
    }
  
    const name = Date.now();
    let thumbnail = req.files.thumbnail;
    console.log(thumbnail)
    let uploadPath = "/vagrant/w6/midZak/public/uploads/" + name+".png";
    console.log(uploadPath)
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
        name
      ];
      console.log(values);
      db.query(query, values)
      .then((data) => {
        const upload = data.rows;
        res.redirect("/");
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