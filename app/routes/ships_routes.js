'use strict';

const express = require('express');
const router = express.Router();
const Ship = require('../models/ship');

router.route('/ships')
  .get((req, res) => {
    Ship.find()
      .then(ships => res.json(ships))
      .catch(err => res.send(err.message));
  })
  .post((req, res) => {
    Ship.create(req.body)
      .then(ship => res.json(ship))
      .catch(err => res.send(err.message));
  })

module.exports = router;
