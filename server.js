const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');

const server = express();

const db = require('./data/db');
const userRoutes = require('./user/userRoutes');

db.connectTo('AuthDemo')
    .then(() => console.log('running'))
    .catch(err => console.log(err));

server.use(helmet());
server.use(express.json())

server.use(session({
    secret: 'lambdaschool',
    name: 'cookieMonster',
    isLoggedIn: false
}))

server.use('/api', userRoutes)

server.get('/api/protectedRoute', (req, res) => {
    const { session } = req;
    if (session.isLoggedIn) {
        res.status(200).json({ msg: "Authorized" })
    } else {
        res.status(401).json({ msg: "UNAUTHORIZED" })
    }
})

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server running on ${port}`)
})