var mongoose = require('mongoose');
var BreakRegistration = require('./BreakRegistration')

var UserSchema = new mongoose.Schema({
  pseudo: String,
  currentBreak : [BreakRegistration],
  nextBreak : [BreakRegistration],
  details: {sport: String},
});

module.exports = mongoose.model('User', UserSchema);