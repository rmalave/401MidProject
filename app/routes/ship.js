'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../lib/bearerMiddleware');
const Ship = require('../models/ship');

router.route('/ships')
  .get(bearerMiddleware, (req, res) => {
    Ship.find()
      .populate('crew')
      .populate('engine')
      .populate('power')
      .populate('supply')
      .then(ships => res.json(ships))
      .catch(err => res.send(err.message));
  })
  .post(bearerMiddleware, (req, res) => {
    Ship.create(req.body)
      .then(ship => res.json(ship))
      .catch(err => res.send(err.message));
  });

router.route('/ship/:_id')
  .get((req, res) => {
    Ship.findById(req.params._id)
      .populate('crew')
      .populate('engine')
      .then(ship => res.json(ship))
      .catch(err => res.send(err.message));
  })
  .put(bearerMiddleware, (req, res) => {
    Ship.findByIdAndUpdate(req.params._id, req.body, { new: true })
      .then(ship => res.json({
        success: true,
        data: ship
      }))
      .catch(err => res.send(err.message));
  })
  .delete(bearerMiddleware, (req, res) => {
    Ship.findByIdAndRemove(req.params._id)
      .then(ship => res.json({ success: true, message: 'Ship successfuly deleted.'}))
      .catch(err => res.send(err.message));
  });

module.exports = router;
