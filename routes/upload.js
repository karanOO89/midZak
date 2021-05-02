module.exports = (db) => {
  router.post("/", (req, res) => {
    const body = req.body ;
    let query = `INSERT INTO products
     (name,
      description,
      price,
      stock,
      thumbnail
      ) VALUES($1,$2,$3,$4,$5)`;

   const values= [
    body.product_name,
    body.description,
    body.price,
    body.stock,
    body.thumbnail,
]
    db.query(query,values)
      .then(data => {
        const upload = data.rows;
        res.render("product_upload", { upload });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    res.render("product_upload");
  })
  return router;
};
