const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const server = express()

mongoose.connect('mongodb://localhost/usersdb')
  .then(() => {
    console.log('API CONNECTED TO DATABASE')
  })
  .catch(error => {
    console.log('Error connecting to database', error)
  });

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.send('API is running....')
})

const port = 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`)
})