var mongoose = require('mongoose');
var answer = require('./Answer')


var QuestionSchema = new mongoose.Schema({
  idQ: Number,
  body: String,
  personalized : Boolean,
  persoBody : [String],
  answers : [answer],
});

/*
const newLocal = QuestionSchema.methods.contructor = function () {
  if (personalization) {
    var a = personalization.size;
  }
};*/
 
var constructor = function(question,details) {
  switch (question.idQ) {
    case 2:
      question.body = question.persoBody[0] + " " + details.name + " " + question.persoBody[0];
  }
  return question
}
 
module.exports =  { "model" : mongoose.model('Question', QuestionSchema),
                    "constructor" : constructor};