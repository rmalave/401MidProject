'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../lib/bearerMiddleware');
const Ship = require('../models/ship');
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

router.route('/supply/:_id')
  .get(bearerMiddleware, (req, res) => {
    Supply.findOneById(req.params._id)
      .then(supply => res.json(supply))
      .catch(err => res.send(err.message));
  })
  .put(bearerMiddleware, (req, res) => {
    Supply.findByIdAndUpdate(req.params._id, req.body, { new: true })
      .then(supply => res.json({
        success: true,
        data: supply
      }))
      .catch(err => res.send(err.mesage));
  })
  .delete((req, res) => {
    Supply.findByIdAndRemove(req.params._id)
      .then(supply => res.json({
        success: true,
        message: 'Successfuly deleted supply '
      }))
      .catch(err => res.send(err.message));
  });

module.exports = router;
