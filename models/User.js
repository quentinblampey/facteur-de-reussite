var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  pseudo: String,
  currentBreak : [Number],
  nextBreak : [Number],
  details: {sport: String, name:String},
});

module.exports = mongoose.model('User', UserSchema);