'use strict';

const mongoose = require('mongoose');

const shipSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  crew: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crew' }],
  engine: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Engine' }],
  supply: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supply' }],
  power: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supply' }]
});

module.exports = mongoose.model('Ship', shipSchema);
