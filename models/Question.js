var mongoose = require('mongoose');
var answer = require('./Answer')


var QuestionSchema = new mongoose.Schema({
  idQ: Number,
  body: String,
  personalized : Boolean,
  persoBody : [String],
  answers : [answer],
  field : String,
  type: String
});


module.exports = mongoose.model('Question', QuestionSchema);