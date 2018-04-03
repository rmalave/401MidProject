'use strict'

require('dotenv').config();

const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const db = require('./config/db');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const app = express();

const PORT = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log('Tuning in to port ' + PORT);
});

// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err)

//   db = database.db("starshipmanager");
//   require('./app/routes') (app, db);
  
//   app.listen(port, () => {
//     console.log('Server is live on port ' + port);
//   });
// })
