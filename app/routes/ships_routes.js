'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../lib/bearerMiddleware');
const Ship = require('../models/ship');

router.route('/ships')
  .get(bearerMiddleware, (req, res) => {
    Ship.find()
      .populate('engine')
      .then(ships => res.json(ships))
      .catch(err => res.send(err.message));
  })
  .post(bearerMiddleware, (req, res) => {
    Ship.create(req.body)
      .then(ship => res.json(ship))
      .catch(err => res.send(err.message));
  });

module.exports = router;
