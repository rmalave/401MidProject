'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send('Authorization required');
    return;
  }

  let token = authHeader.split('Bearer ')[1];

  if (!token) {
    res.send('invalid token');
    return;
  }

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {

    if (err) res.send(err.message);

    User.findOne({ _id: decoded.userId })
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => res.send(err.message));
  });
};
