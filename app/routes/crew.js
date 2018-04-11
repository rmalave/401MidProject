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

router.route('/crew/:_id')
  .get(bearerMiddleware, (req, res) => {
    Crew.findOneById(req.params._id)
      .then(crew => res.json(crew))
      .catch(err => err.send(err.message));
  })
  .post(bearerMiddleware, (req, res) => {
    Crew.findByIdAndUpdate(req.params._id, req.body, { new: true })
      .then(crew => res.json({
        success: true,
        data: crew
      }))
      .catch(err => res.send(err.message));
  })
  .delete(bearerMiddleware, (req, res) => {
    Crew.findByIdAndRemove(req.params._id)
      .then(crew => res.json({
        success: true,
        message: 'Successfully deleted crew ' + crew
      }));
  });

module.exports = router;
