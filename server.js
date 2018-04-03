'use strict'

require('dotenv').config();

const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const db = require('./config/db');
const mongoose = require('mongoose');
const router = require('./app/routes/index');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('Tuning in to port ' + PORT);
});
