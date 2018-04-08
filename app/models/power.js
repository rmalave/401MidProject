const mongoose = require('mongoose');

const powerSchema = mongoose.Schema({
<<<<<<< HEAD
<<<<<<< HEAD
  ship: {type: mongoose.Schema.Types.ObjectId, ref: 'Power'},
=======
>>>>>>> 14feac5bbb091f407fce6bf558bf28cb7e1a8b03
  battery: {type: String, require: true},
  engineLevel: {type: String, require: true},
=======
  ship: {type: mongoose.Schema.Types.ObjectId, ref: 'Power'},
  battery: {type: Number, min: 0, max: 100, require: true},
  engineLevel: {type: Number, min: 0, max: 100, require: true},
>>>>>>> 528fe527d4a923d48a5b6133de458934753b2c4b
})
const Power = mongoose.model('Power', powerSchema);

module.exports = Power;
