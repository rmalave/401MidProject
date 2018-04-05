'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router
  .route('/users')
  .get((req, res) => {
    User.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err.message));
  })
  .post((req, res) => {
    User.create(req.body)
      .then(user => {
        res.json(user);
      })
      .catch(err => res.send(err.message));
  });

router.route('/signin').get((req, res) => {
  let authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401);
    res.send('Must provide a username/password');
    return;
  }
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');

  User.findOne({ username: username })
    .then(user => {
      if (user === null) {
        res.send('user not found');
      }
      user.comparePassword(password, (err, isValid) => {
        if (err) throw err;

        if (!isValid) {
          res.status(401).send('wrong password');
        }

        let payload = { userId: user._id };
        let token = jwt.sign(payload, process.env.APP_SECRET);

        console.log('token from signin:', token);

        res.send({ success: true, token: token });
      });
    })
    .catch(err => res.send(err.message));
});

module.exports = router;
