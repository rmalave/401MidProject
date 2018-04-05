'use strict';

const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Ship', shipSchema);
