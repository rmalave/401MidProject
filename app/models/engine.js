'use strict';

const mongoose = require('mongoose');

const engineSchema = mongoose.Schema({
  ftl: { type: Boolean, required: true },
  stl: { type: Boolean, required: true }
});

module.exports = mongoose.model('Engine', engineSchema);
