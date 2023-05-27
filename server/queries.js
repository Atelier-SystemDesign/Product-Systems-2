const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'benjis-brain',
  host: '/var/run/postgresql',
  database: 'product2',
  password: '',
  port: '5432',
});
pool.connect().then(() => {
  console.log('connected');
});

const Related = (product_id) => pool.query('SELECT * FROM relatedAPI WHERE product_id = $1', [product_id]);

const Product = (product_id) => pool.query('SELECT * FROM productAPI WHERE id = $1', [product_id]);

const Styles = (product_id) => pool.query('SELECT * FROM stylesAPI WHERE product_id = $1', [product_id]);

const Products = (page, count) => pool.query('SELECT * FROM productAPI WHERE id >= $1 AND id < $2', [1 + (count * (page - 1)), 1 + (count * (page))]);

module.exports = {
  Related, Product, Styles, Products,
};
