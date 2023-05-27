const fs = require('fs');
const neo = require('./connection');

const productStream = fs.createReadStream('../ProductsCSV/product.csv', { encoding: 'utf-8' });

async function loadProducts() {
  let count = 0;
  try {
    const readStream = fs.createReadStream('../ProductsCSV/product.csv', { encoding: 'utf-8' });
    let overflow = '';
    for await (const chunk of readStream) {
      /// Pull out chunk
      let rows = chunk.split('\n');
      // rows[0] = rows[0] + overflow;
      const newZero = overflow + rows[0];
      rows[0] = newZero;
      overflow = rows[rows.length - 1];
      rows = rows.map((row) => row.split(','));
      //  store leftover scraps
      const merges = [];
      rows.forEach((row) => {
        merges.push(neo.executeQuery(
          'CREATE (p:Product{id:$id,name:$name, slogan:$slogan, description:$description, category:$category })',
          {
            id: row[0],
            name: row[1] || 'null',
            slogan: row[2] || 'null',
            description: row[3] || 'null',
            category: row[4] || 'null',
          },
          { database: 'neo4j' },
        ));
      });
      // category:$category
      // category:row[4],
      await Promise.all(merges);
      await neo.executeQuery('CREATE INDEX ON :Product(id)', {}, { database: 'neo4j' });
      count += 1;
      console.log('Merge #', count);
      //  Await queries.
      //  merge (p:Product {Id: Product_id})
      //  set p.name: String
      //  p.slogan: String
      //  p.description: String
      //  p.category: String
    }
    console.log('Products Loaded');
  } catch (error) {
    console.log(error);
  }
}

async function loadRelated() {
  try {
    const readStream = fs.createReadStream('../ProductsCSV/related.csv', { encoding: 'utf-8' });
    let overflow;
    for await (const chunk of readStream) {
      let rows = chunk.split('\n');
      // rows[0] = rows[0] + overflow;
      const newZero = overflow + rows[0];
      rows[0] = newZero;
      overflow = rows[rows.length - 1];
      rows = rows.map((row) => row.split(','));
      /// Pull out chunk
      /// make it into discernable pieces.
      //  store leftover scraps
      //  Await queries.
      // (p1:{id:current_product_id})-[RELATED_TO]->(p2:{id:related_product_id})
      // id,current_product_id,related_product_id
      // 1,1,2
    }
    console.log('Related Loaded');
  } catch (error) {
    console.log(error);
  }
}

async function loadFeatures() {
  try {
    const readStream = fs.createReadStream('../ProductsCSV/features.csv', { encoding: 'utf-8' });
    let overflow;
    for await (const chunk of readStream) {
      let rows = chunk.split('\n');
      // rows[0] = rows[0] + overflow;
      const newZero = overflow + rows[0];
      rows[0] = newZero;
      overflow = rows[rows.length - 1];
      rows = rows.map((row) => row.split(','));
      /// Pull out chunk
      /// make it into discernable pieces.
      //  store leftover scraps
      //  Await queries.
      // id,product_id,feature,value
      // 1,1,"Fabric","Canvas"
      // merge (p:Product {id:product_id)-[HAS_FEATURE]->(f:Feature ${feature}:{value:${value}})
    }

    console.log('Features Loaded');
  } catch (error) {
    console.log(error);
  }
}

async function loadStyles() {
  try {
    const readStream = fs.createReadStream('../ProductsCSV/styles.csv', { encoding: 'utf-8' });
    let overflow;
    for await (const chunk of readStream) {
      let rows = chunk.split('\n');
      // rows[0] = rows[0] + overflow;
      const newZero = overflow + rows[0];
      rows[0] = newZero;
      overflow = rows[rows.length - 1];
      rows = rows.map((row) => row.split(','));
      /// Pull out chunk
      /// make it into discernable pieces.
      //  store leftover scraps
      //  Await queries.
      //  id, productId, name, sale_price, original_price, default_style
    }

    console.log('Styles Loaded');
  } catch (error) {
    console.log(error);
  }
}

async function loadPhotos() {
  try {
    const readStream = fs.createReadStream('../ProductsCSV/photos.csv', { encoding: 'utf-8' });
    let overflow;
    for await (const chunk of readStream) {
      let rows = chunk.split('\n');
      // rows[0] = rows[0] + overflow;
      const newZero = overflow + rows[0];
      rows[0] = newZero;
      overflow = rows[rows.length - 1];
      rows = rows.map((row) => row.split(','));
      /// Pull out chunk
      /// make it into discernable pieces.
      //  store leftover scraps
      //  Await queries.
      //  id, styleId, url, thumbnail_url
    }

    console.log('Photos Loaded');
  } catch (error) {
    console.log(error);
  }
}

async function loadSkus() {
  try {
    const readStream = fs.createReadStream('../ProductsCSV/skus.csv', { encoding: 'utf-8' });
    let overflow;
    for await (const chunk of readStream) {
      let rows = chunk.split('\n');
      // rows[0] = rows[0] + overflow;
      const newZero = overflow + rows[0];
      rows[0] = newZero;
      overflow = rows[rows.length - 1];
      rows = rows.map((row) => row.split(','));
      /// Pull out chunk
      /// make it into discernable pieces.
      //  store leftover scraps
      //  Await queries.
      //  id,styleId,size,quantity
    }

    console.log('SKUS Loaded');
  } catch (error) {
    console.log(error);
  }
}

// printFileToConsole()
async function loadData() {
  await loadProducts();
  await loadRelated();
  await loadFeatures();
  await loadStyles();
  await loadPhotos();
  await loadSkus();
  console.log('Load Completed. Congrats, you MadMan');
}
// loadProducts()
