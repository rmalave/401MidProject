'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../lib/bearerMiddleware');
const Ship = require('../models/ship');
const Power = require('../models/power');

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 14feac5bbb091f407fce6bf558bf28cb7e1a8b03
=======
>>>>>>> 528fe527d4a923d48a5b6133de458934753b2c4b
router.route('/power')
  .get(bearerMiddleware, (req, res) => {
    Power.find()
      .then(power => res.json(power))
      .catch(err => res.send(err.message));
  })
  .post(bearerMiddleware, (req, res) => {
    Power.create(req.body)
      .then(power => res.json(power))
      .catch(err => res.send(err.message));
  });

module.exports = router;
