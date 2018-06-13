const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const server = express();

const db = require('./data/db');
const userRoutes = require('./user/userRoutes');

db.connectTo('AuthDemo')
    .then(() => console.log('running'))
    .catch(err => console.log(err));

server.use(helmet());
server.use(express.json())

server.use('/api', userRoutes)

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server running on ${port}`)
})