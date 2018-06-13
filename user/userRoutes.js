const express = require('express');

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
    console.log(req.body)
    const user = new User(newUser);
    user.save()
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

const authenticate = (req, res) => {
    const password = req.body;

    if (password !== undefined) {
        res.status(400).json({"message": "Please enter your password"})
    } else {
        console.log('You shall not pass');
    }
    
}


module.exports = router;