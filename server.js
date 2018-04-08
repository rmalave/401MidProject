'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const indexRouter = require('./app/routes/index');
const shipRouter = require('./app/routes/ships_routes');
const userRouter = require('./app/routes/user');
const engineRouter = require('./app/routes/engine');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', indexRouter);
app.use('/api', shipRouter);
app.use('/api', userRouter);
app.use('/api', engineRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Tuning in to port ' + PORT);
});
