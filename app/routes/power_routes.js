'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../lib/bearerMiddleware');
const Ship = require('../models/ship');
const Power = require('../models/power');

router.route('/power')
  .get(bearerMiddleware, (req, res) => {
    Power.find()
      .then(power => res.json(power))
      .catch(err => res.send(err.message));
  })
  .post(bearerMiddleware, (req, res) => {
    Power.create(req.body)
      .then(power => {
        Ship.findByIdAndUpdate(
          power.ship,
          { $push: { engine: power._id }},
          { new: true })
          .catch(err => res.send(err.message));

        res.json(power);
      })
      .catch(err => res.send(err.message));
  });

module.exports = router;
