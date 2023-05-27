const express = require('express');
const query = require('./queries');

const router = express.Router();

router.get('/products', (req, res) => {
  const { count, page } = req.query;
  query.Products(page, count).then((result) => {
    res.send(result.rows);
  });
});
router.get('/products/:product_id', (req, res) => {
  query.Product(req.params.product_id).then((results) => {
    res.send(results.rows);
  });
});
router.get('/products/:product_id/styles', (req, res) => {
  query.Styles(req.params.product_id).then((results) => {
    res.send(results.rows);
  });
});
router.get('/products/:product_id/related', (req, res) => {
  query.Related(req.params.product_id).then((results) => {
    res.send(results.rows);
  });
});

module.exports = router;
