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
app.get('/product', async(request, response) => {
  
  response.send({'ack':true})
});

app.get('/product/:id', async(request, response) => {
  const loomOnly = await db.find({'_id':request.params.id});
  response.send(loomOnly);
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
