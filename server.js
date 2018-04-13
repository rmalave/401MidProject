'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shipRouter = require('./app/routes/ship');
const userRouter = require('./app/routes/user');
const crewRouter = require('./app/routes/crew');
const engineRouter = require('./app/routes/engine');
const supplyRouter = require('./app/routes/supply');

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', shipRouter);
app.use('/api', userRouter);
app.use('/api', crewRouter);
app.use('/api', engineRouter);
app.use('/api', supplyRouter);

const PORT = process.env.PORT;

const server = (module.exports = {});

server.isOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if (server.isOn)
      return reject(new Error('Server Error. Server already running.'));
    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
      server.isOn = true;
      mongoose.connect(MONGODB_URI);
      return resolve(server);
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn)
      return reject(new Error('Server Error. Server already stopped.'));
    server.http.close(() => {
      server.isOn = false;
      mongoose.disconnect();
      return resolve();
    });
  });
};
