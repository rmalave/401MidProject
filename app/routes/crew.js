'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../lib/bearerMiddleware');
const Crew = require('../models/crew');
const Ship = require('../models/ship');

router.route('/crew')
  .get(bearerMiddleware, (req, res) => {
    Crew.find()
      .then(crew => res.json(crew))
      .catch(err => res.send(err.message));
  })
  .post(bearerMiddleware, (req, res) => {
    Crew.create(req.body)
      .then(crew => {
        Ship.findByIdAndUpdate(
          crew.ship,
          { $push: { crew: crew._id } },
          { new: true })
          .catch(err => res.send(err.message));
        res.json(crew);
      })
      .catch(err => res.send(err.message));
  });
  
module.exports = router;
