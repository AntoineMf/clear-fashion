/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');

async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

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


const products = dedicatedbrand.scrape('https://www.dedicatedbrand.com/en/men/news');



const [,, eshop] = process.argv;

sandbox(eshop);
