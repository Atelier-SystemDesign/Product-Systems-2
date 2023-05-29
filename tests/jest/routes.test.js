const axios = require('axios');

// get products
// get product
// get styles
// get related

describe('Related Products Endpoint', () => {
  let response;
  beforeAll(async () => {
    await axios.get('http://localhost:3000/products/979820/related').then((result) => {
      response = result.data;
    }).catch((err) => {
      response = err;
    });
  });
  test('It does not return an error', async () => {
    expect(response).not.toBeInstanceOf(Error);
  });
  test('It returns an Array', () => {
    expect(response).toBeInstanceOf(Array);
  });
  test('Each Element of the Array should Be a number', () => {
    const onlyNums = !response.some((x) => typeof x !== 'number');
    expect(onlyNums).toEqual(true);
  });
});

describe('Product Lookup Endpoint', () => {
  let response;
  beforeAll(async () => {
    await axios.get('http://localhost:3000/products?page=100&count=50').then((result) => {
      response = result.data;
    }).catch((err) => {
      response = err;
    });
  });
  test('It does not return an error', async () => {
    expect(response).not.toBeInstanceOf(Error);
  });
});

describe('Specific Product Endpoint', () => {
  let response;
  beforeAll(async () => {
    await axios.get('http://localhost:3000/products/900000').then((result) => {
      response = result.data;
    }).catch((err) => {
      response = err;
    });
  });
  test('It does not return an error', async () => {
    expect(response).not.toBeInstanceOf(Error);
  });
  test('The returned value should be an Object with certain properties', () => {
    const resultsKeys = Object.keys(response);
    expect(resultsKeys).toEqual(expect.arrayContaining([
      'id',
      'name',
      'slogan',
      'description',
      'category',
      'default_price',
      'features',
    ]));
  });
});

// "id": 11,
// "name": "Air Minis 250",
// "slogan": "Full court support",
// "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
// "category": "Basketball Shoes",
// "default_price": "0",
// "features": [
// {
//         "feature": "Sole",
//         "value": "Rubber"
//     },
// {
//         "feature": "Material",
//         "value": "FullControlSkin"
//     },
// // ...
// ],


describe('Styles Products Endpoint', () => {
  let response;
  beforeAll(async () => {
    await axios.get('http://localhost:3000/products/962356/styles').then((result) => {
      response = result.data;
    }).catch((err) => {
      response = err;
    });
  });
  test('It does not return an error', async () => {
    expect(response).not.toBeInstanceOf(Error);
  });
  test('It has results and Product_id properties', () => {
    console.log(response);
    expect(response.data.product_id).toBeInstanceOf('String');
    expect(Number(response.data.product_id)).not.toBeNaN();
  });
  test('Results should be an array with certain properties', () => {
    const resultsKeys = Object.keys(response.results[0]);
    expect(resultsKeys).toEqual(expect.arrayContaining([
      'style_id',
      'name',
      'original_price',
      'sale_price',
      'default?',
      'photos',
      'skus',
    ]));
  });
  test('Each Style shold have certain properties', () => {
    const {
      style_id, name, original_price, sale_price,
    } = response.results[0];
    const def = response.results[0]['default?'];
    expect(style_id).toBeInstanceOf(Number);
    expect(name).toBeInstanceOf(String);
    expect(original_price).toBeInstanceOf(String);
    expect(sale_price).toBeInstanceOf(String);
    expect(def).toBeInstanceOf(Boolean);
  });

  test('Each Style should have a photo property with additional properties', () => {
    const { photos } = response.results[0];
    const photo = photos[0];
    expect(photos).toBeInstanceOf(Array);
    expect(photo.thumbnail_url).toBeInstanceOf(String);
    expect(photo.url).toBeInstanceOf(String);
  });

  test('Each Style should have a skus property with certain properties', () => {
    const { skus } = response.results[0];
    const skuKey = Object.keys(skus)[0];
    expect(Number(skuKey)).not.toBeNaN();
    expect(skus[skuKey].quantity).toBeInstanceOf(Number);
    expect(skus[skuKey].size).toBeInstanceOf(String);
  });

});
