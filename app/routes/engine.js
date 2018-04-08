'use strict';

const express = require('express');
const router = express.Router();
const Engine = require('../models/engine');
const Ship = require('../models/ship');
const bearerMiddleware = require('../lib/bearerMiddleware');

router.route('/engines')
  .get(bearerMiddleware, (req, res) => {
    Engine.find()
      .then(engines => res.json(engines))
      .catch(err => res.send(err.message));
  })
  .post(bearerMiddleware, (req, res) => {
    Engine.create(req.body)
      .then(engine => {
        Ship.findByIdAndUpdate(
          engine.ship,
          { $push: { engine: engine._id } },
          { new: true })
          .catch(err => res.send(err.message));

        res.json(engine);
      })
      .catch(err => res.send(err.message));
  });

router.route('/engine/:_id')
  .get(bearerMiddleware, (req, res) => {
    Engine.findOneById(req.params._id)
      .then(engine => res.json(engine))
      .catch(err => res.send(err.message));
  })
  .put(bearerMiddleware, (req, res) => {
    Engine.findOneAndUpdate({ _id: req.params._id })
      .then(engine => res.json({
        success: true,
        data: engine
      }))
      .catch(err => res.send(err.message));
  })
  .delete(bearerMiddleware, (req, res) => {
    Engine.findByIdAndRemove(req.params._id)
      .then(engine => res.json({
        success: true,
        message: 'Successfuly deleted engine' + req.params._id
      }))
      .catch(err => res.send(err.message));
  });

module.exports = router;
