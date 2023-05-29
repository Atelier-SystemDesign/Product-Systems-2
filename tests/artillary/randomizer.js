const fs = require('fs');

fs.writeFile('./tests/artillary/product_ids.csv', '', () => console.log('file reset'));
const writer = fs.createWriteStream('product_ids.csv');

function randomize(count) {
for (let i = 0; i<10000; i++){
  const random = 1000000- Math.floor(Math.random()*100000)
  writer.write(`${random}\n`);
}
}

randomize();
