var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  idQ: Number,
  body: String,
  reaction: String,
  personalization: [String],
  breakPoint: Boolean,
});

module.exports = mongoose.model('Answer', AnswerSchema);