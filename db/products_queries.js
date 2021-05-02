const { response } = require('express');
const db = require('./db');


const getProducts = () => {
  return db.query('SELECT * From products;')
    .then((res) => {
      return response.rows;
    });
  };

  const getProductsBYId = () => {
    return db.query('SELECT * From products WERE id = $1', [id])
      .then((res) => {
        return response.rows[0];
      });
    };

module.exports = {
  getProducts,
  getProductsBYId
}
