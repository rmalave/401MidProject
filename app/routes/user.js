'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.route('/users')
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
      .catch(err => res.status(400).send(err.message));
  });

router.route('/signin')
  .get((req, res) => {
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
            return;
          }

          let payload = { userId: user._id };
          let secret = process.env.APP_SECRET;
          let token = jwt.sign(payload, secret);

          res.send({ success: true, token: token });
        });
      })
      .catch(err => res.send(err.message));
  });

router.route('/user/:_id')
  .get((req, res) => {
    User.findById(req.params._id)
      .then(user => res.json(user))
      .catch(err => res.send(err.message));
  })
  .put((req, res) => {
    User.findByIdAndUpdate(req.params._id, req.body, { new: true })
      .then(user => res.json({
        success: true,
        data: user
      }))
      .catch(err => res.send(err.message));
  })
  .delete((req, res) => {
    User.findByIdAndRemove(req.params._id)
      .then(user => res.json({
        success: true,
        message: 'Successfuly deleted user'
      }))
      .catch(err => res.send(err.message));
  });

module.exports = router;
