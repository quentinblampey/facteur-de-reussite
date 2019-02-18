var mongoose = require('mongoose');

var BreakRegistrationSchema = new mongoose.Schema({
  idQ: Number,
  personalization: [String],
});

module.exports = mongoose.model('BreakRegistration', BreakRegistrationSchema);