const mongoose = require('mongoose');

const powerSchema = mongoose.Schema({
  battery: {type: String, require: true},
  engineLevel: {type: String, require: true},
})
const Power = mongoose.model('Power', powerSchema);

module.exports = Power;
