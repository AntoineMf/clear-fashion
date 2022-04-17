const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { Db } = require('mongodb');
const db = require('./db')

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products/search',async(request,response)=>{
  const {price,brand,page,size}=request.query;
  let product
  if(typeof price !== 'undefined'){
    let priceInt = parseInt(price);
    if(brand === "All"){
      product = await db.find({"price":{"$lte":priceInt}})
    }
    else{
      product = await db.find({"price":{"$lte":priceInt},"brand":brand})
    }
  }
  else if(brand !== "All"){
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

} )
app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);