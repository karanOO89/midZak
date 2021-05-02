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

module.exports = {
  getProducts,
  getProductsBYId
}
