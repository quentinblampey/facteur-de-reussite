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
 
QuestionSchema.methods.constructor = function(details) {
  switch (this.idQ) {
    case 2:
      this.body = this.persoBody[0] + " " + details.name + " " + this.persoBody[0];
  }
}
 
module.exports = mongoose.model('Question', QuestionSchema);