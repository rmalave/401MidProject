const mongoose = require('mongoose');

const powerSchema = mongoose.Schema({
  ship: {type: mongoose.Schema.Types.ObjectId, ref: 'Power'},
  battery: {type: Number, min: 0, max: 100, require: true},
  engineLevel: {type: Number, min: 0, max: 100, require: true},
})
const Power = mongoose.model('Power', powerSchema);

module.exports = Power;
