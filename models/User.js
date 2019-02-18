var mongoose = require('mongoose');
var breakRegistration = require('./BreakRegistration')

var UserSchema = new mongoose.Schema({
  pseudo: String,
  currentBreak : [breakRegistration],
  nextBreak : [breakRegistration],
  details: [String],
});

module.exports = mongoose.model('User', UserSchema);