const mongoose = require('mongoose');

const supplySchema = mongoose.Schema({
  ship: {type: mongoose.Schema.Types.ObjectId, ref: 'Supply'},
  ammunition: {type: Number, min: 0, max: 100, require: true},
  food: {type: Number, min: 0, max: 100, require: true},
  fuel: {type: Number, min: 0, max: 100, require: true}
})
const Supply = mongoose.model('Supply', supplySchema);

module.exports = Supply;
