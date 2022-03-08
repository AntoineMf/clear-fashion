/* eslint-disable no-console, no-process-exit 
const dedicatedbrand = require('./sources/dedicatedbrand');

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    products.forEach(products => {
      console.log(products.link);
    })
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


const montlimart = require('./sources/montlimart');

async function sandbox (eshop = 'https://www.montlimart.com/polos-t-shirts.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimart.scrape(eshop);

    console.log(products);
    console.log('done');
    products.forEach(products => {
      console.log(products.name);
    })
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}*/

const adresse = require('./sources/adresse');

async function sandbox (eshop = 'https://adresse.paris/583-manteaux-et-blousons') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adresse.scrape(eshop);

    console.log(products);
    console.log('done');
    products.forEach(products => {
      console.log(products.name);
    })
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


const [,, eshop] = process.argv;

sandbox(eshop);
