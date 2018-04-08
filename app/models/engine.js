'use strict';

const mongoose = require('mongoose');

const engineSchema = mongoose.Schema({
  ftl: { type: Boolean, required: true },
  stl: { type: Boolean, required: true },
  ship: { type: mongoose.Schema.Types.ObjectId, ref: 'Ship' }
});

module.exports = mongoose.model('Engine', engineSchema);
