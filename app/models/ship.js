'use strict';

const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  engine: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Engine' }]
});

module.exports = mongoose.model('Ship', shipSchema);
