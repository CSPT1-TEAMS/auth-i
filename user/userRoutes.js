const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./User');

const router = express.Router();

router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.post('/register', (req, res) => {
    const newUser = req.body;
    const { username, password } = req.body;
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
        res.status(400).json({"error": "Enter your username and password"})
    }
    // console.log(req.session)
    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            req.session.isLoggedIn = true;
            user.comparePasswords(password, isMatch => {
                if (isMatch) {
                    res.status(200).json({ "message": "Logged in" })
                } else {
                    res.status(401).json({"error": "Incorrect password"})
                }
            })
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})




module.exports = router;