const mongoose = require('mongoose');

const powerSchema = mongoose.Schema({
<<<<<<< HEAD
  ship: {type: mongoose.Schema.Types.ObjectId, ref: 'Power'},
=======
>>>>>>> 14feac5bbb091f407fce6bf558bf28cb7e1a8b03
  battery: {type: String, require: true},
  engineLevel: {type: String, require: true},
})
const Power = mongoose.model('Power', powerSchema);

module.exports = Power;
