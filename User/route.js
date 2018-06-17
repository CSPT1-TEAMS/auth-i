const express = require('express');
const User = require('./model.js');

const router = express.Router();

const requiresAuthorization = (req, res, next) => {
  if (req.session && req.session.username) next();
  else res.status(401).json({msg: "You shall not pass!"})
}

router.route("/register")
  .post((req, res) => {
    const user = new User(req.body)
    user.save()
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  })

router.route("/login")
  .post((req, res) => {
    const { username, password } = req.body;
    User.findOne({username})
      .then(user => {
        user.verifyPassword(password, isVerified => {
          if (isVerified) {
            req.session.username = user.username;
            res.status(200).json({msg: "Logged in"})
          }
          else res.status(401).json({msg: "You shall not pass!"})
        })
      })
      .catch(() => {
        res.status(500).json({msg: "username does not exist"});
      })
  })

router.route("/users")
  .get(requiresAuthorization, (req, res) => {
    User.find()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).send(err);
      })
  })

module.exports = router;
