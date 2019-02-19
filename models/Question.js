var mongoose = require('mongoose');
var answer = require('./Answer')


var QuestionSchema = new mongoose.Schema({
  idQ: Number,
  body: String,
  personalization: [String],
  answers : [answer],
});

/*
const newLocal = QuestionSchema.methods.contructor = function () {
  if (personalization) {
    var a = personalization.size;
  }
};*/

module.exports = mongoose.model('Question', QuestionSchema);