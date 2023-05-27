/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { Client } = require('pg');

// make connection to Postgres databas
const postgres = new Client({
  user: 'benjis-brain',
  host: '/var/run/postgresql',
  database: 'product2',
  password: '',
  port: '5432',
});
postgres.connect().then(() => {
  console.log('connected');
});

// eslint-disable-next-line no-unused-vars
async function transformRelated() {
  let first = true;
  try {
    const readStream = fs.createReadStream('../ProductsCSV/related.csv', { encoding: 'utf-8' });
    let overflow = '';
    let unfinishedID = {};
    for await (const chunk of readStream) {
      /// Pull out chunk
      const rows = chunk.split('\n');
      if (first) {
        console.log('>>>>Value Removed', rows[0]);
        rows.shift();
        first = false;
      }
      // rows[0] = rows[0] + overflow;
      const newZero = overflow + rows[0];
      rows[0] = newZero;
      overflow = rows.pop();
      const collection = { ...unfinishedID };
      rows.forEach((row, index) => {
        const rowAr = row.split(',');
        const current = rowAr[1];
        const relatedTo = rowAr[2];
        if (collection[current] === undefined) {
          collection[current] = [Number(relatedTo)];
        } else {
          collection[current].push(Number(relatedTo));
        }
        if (index === rows.length - 1) {
          unfinishedID = { [current]: collection[current] };
          delete collection[current];
        }
      });
      const promises = [];
      Object.entries(collection).forEach((entry) => {
        promises.push(postgres.query(
          'INSERT INTO relatedAPI (product_id, relates_to) VALUES($1, $2);',
          [Number(entry[0]), entry[1]],
        ));
      });
      await Promise.all(promises);
    }
  } catch (error) {
    console.log(error);
  }
}

// transformRelated();
