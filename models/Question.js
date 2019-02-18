var mongoose = require('mongoose');
var answer = require('./Answer')


var QuestionSchema = new mongoose.Schema({
  idQ: Number,
  body: String,
  personalization: [String],
  answers : [answer],
});

module.exports = mongoose.model('Question', QuestionSchema);