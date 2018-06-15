const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');

const server = express();

mongoose.connect('mongodb://localhost:27017/AuthDemo')
    .then(mongo => {
        console.log('Connected')
    })
    .catch(err => {
        console.log(err)
    })
const userRoutes = require('./user/userRoutes');

server.use(helmet());
server.use(express.json())

server.use(session({
    secret: 'lambdaschool',
    name: 'cookieMonster',
    isLoggedIn: false
}))

server.use('/api', userRoutes)

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server running on ${port}`)
})