'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../lib/bearerMiddleware');
const Ship = require('../models/ship');
const Power = require('../models/power');
const Supply = require('../models/supply');

router.route('/supply')
  .get(bearerMiddleware, (req, res) => {
    Supply.find()
      .then(supply => res.json(supply))
      .catch(err => res.send(err.message));
  })
  .post(bearerMiddleware, (req, res) => {
    Supply.create(req.body)
      .then(supply => {
        Ship.findByIdAndUpdate(
          supply.ship,
          { $push: { supply: supply._id }},
          { new: true })
          .catch(err => res.send(err.message));

        res.json(supply);
      })
      .catch(err => res.send(err.message));
  });

module.exports = router;
