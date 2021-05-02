const express = require('express');
const router = express.Router();
const productFunctions = require('../db/product-queries');

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
