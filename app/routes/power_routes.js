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

router.route('/power/:_id')
  .get((req, res) => {
    Power.findOneById(req.params._id)
      .then(power => res.json(power))
      .catch(err => res.send(err.message));
  })
  .put((req, res) => {
    Power.findByIdAndUpdate(req.params._id, req.body, { new: true })
      .then(power => res.json({
        success: true,
        message: 'Successfuly updated power'
      }));
  })
  .delete((req, res) => {
    Power.findByIdAndRemove(req.params._id)
      .then(power => res.json({
        success: true,
        message: 'Successfuly deleted power'
      }));
  });

module.exports = router;
