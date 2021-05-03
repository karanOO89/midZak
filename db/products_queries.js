
const { response } = require('express');
const db = require('./db');


const getProducts = () => {
  return db.query('SELECT * From products;')
    .then((res) => {
      return response.rows;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
};

const getProductsBYId = () => {
  return db.query('SELECT * From products WERE id = $1', [id])
    .then((res) => {
      return response.rows[0];
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
};
const putProducts = () => {


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
    body.thumbnail
  ];
  return db.query(query,values)
    .then((res) => {
      return response.rows;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
};


module.exports = {
  getProducts,
  getProductsBYId,
  putProducts
}
