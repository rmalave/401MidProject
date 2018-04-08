'use strict';

const mongoose = require('mongoose');

const crewSchema = mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true, enum: ['officer', 'enlisted'] },
  ship: { type: mongoose.Schema.Types.ObjectId, ref: 'Ship'}

});

module.exports = mongoose.model('Crew', crewSchema);
