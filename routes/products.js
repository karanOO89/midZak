/*
 * All routes for Products are defined here
 * Since this file is loaded in server.js into api/products,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router = express.Router();
const productFunctions = require("../db/products_queries")

module.exports = () => {
  // GET /products
  router.get('/', (req, res) => {
    productFunctions.getProducts()
      .then((products) => {
        res.json(products);
      });
  })

  //GET /products/:id
  router.get('/:id', (req, res) => {
    productFunctions.getProductById(req.params.id)
    .then((product) => {
      res.json(product);
    });
  });
}
