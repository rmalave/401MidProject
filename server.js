'use strict'

require('dotenv').config();

const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const db = require('./config/db');
const mongoose = require('mongoose');
const indexRouter = require('./app/routes/index');
const shipRouter = require('./app/routes/ships_routes');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', indexRouter);
app.use('/api', shipRouter);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('Tuning in to port ' + PORT);
});
