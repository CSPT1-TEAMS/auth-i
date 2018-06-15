const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./User');

const router = express.Router();

// router.get('/', (req, res) => {
//     User.find()
//         .then(users => {
//             res.status(200).json(users)
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         })
// })

const requirements= { error: "Enter a username and password"};

router.post('/register', (req, res) => {
    const newUser = req.body;
    if (!req.body.username || !req.body.password) {
        res.status(400).json(requirements)
    }

    const user = new User(newUser);
    user.save()
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.put('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json(requirements)
    }

    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            req.session.isLoggedIn = true;
            user.comparePasswords(password, isMatch => {
                if (isMatch) {
                    res.status(200).json({ msg: "Logged in" })
                } else {
                    res.status(401).json({ error: "You shall not pass" })
                }
            })
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})

router.get('/users', (req, res) => {
    const { session } = req;

    User.find()
        .select('username -_id')
        .then(users => {
            if (session.isLoggedIn) {
                res.status(200).json({ users })
            } else {
                res.status(401).json({ msg: "You shall not pass!" })
            }
        })
        .catch(err => {
            res.status(500).json({ err });
        })
})

module.exports = router;