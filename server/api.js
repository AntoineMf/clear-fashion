const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./db');

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

/*app.get('/test/:brand', async(request, response) => {
  const loomOnly = await db.find({'brand':request.params.brand});
  response.send(loomOnly);
});*/
app.get('/test/:price', async(request, response) => {
  const loomOnly = await db.find({'price':{$lt:parseInt(request.params.price)}});
  response.send(loomOnly);
});

app.get('/test', async(request, response) => {
  
  response.send({'ack':true})
});
app.get('/a', (request, response) => {
  response.send({'ack': true});
});

app.get('/product/search', async(request, response) => {
  const {limit,price,brand} = request.query;
  let product;

  /*if (typeof price !== 'undefined'){
    let priceInt= parseInt(price);
  }

  //if (typeof limit !== 'undefined' && typeof brand !== )*/

  product = await db.find({'price':{$lt:parseInt(price)}})
  console.log(request.query)
  response.send(product);
});
app.get('/product', async(request, response) => {
  const {limit,price,brand} = request.query;
  let product;

  /*if (typeof price !== 'undefined'){
    let priceInt= parseInt(price);
  }

  //if (typeof limit !== 'undefined' && typeof brand !== )*/

  product = await db.find({'price':{$lt:parseInt(price)},'brand':brand})
  console.log(request.query)
  response.send(product);
});
app.get('/products/search',async(request,response)=>{
  const {price,brand,page,size}=request.query;
  let product
  if(typeof price !== 'undefined'){
    let priceInt = parseInt(price);
    if(brand === "all"){
      product = await db.find({"price":{"$lte":priceInt}})
    }
    else{
      product = await db.find({"price":{"$lte":priceInt},"brand":brand})
    }
  }
  else if(brand !== "all"){
    product = await db.find({'brand':brand})
  }
  else{
    product = await db.find({})
  }
  if(typeof page !== 'undefined' && typeof size !== 'undefined'){
    let pageInt = parseInt(page)
    let sizeInt = parseInt(size)

    const indexFirstProduct = (pageInt-1)*sizeInt

    var myPage = []

    for(var i = indexFirstProduct; i<indexFirstProduct+sizeInt; i++){
      myPage.push(product[i])
    }
    product = myPage

  }
  response.send(product)
});

app.get('/products/:id', async(request, response) => {
  const products = await db.find({'_id':request.params.id});
  response.send(products);
});

app.get('/count', async (request, response) => {
  client = await MongoClient.connect(MONGODB_URI, { 'useNewUrlParser': true });
  const data = await client.db(MONGODB_DB_NAME)
  console.log("Connected to database ${data.databaseName}")

  const products = data.collection('products')

  let searchCursor

  searchCursor = await products.countDocuments()

  let result = []

  result.push(searchCursor)

  response.send(result)

} );

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
