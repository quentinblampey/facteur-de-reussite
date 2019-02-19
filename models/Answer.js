var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
  idQ: Number,
  idPrevQ : Number,
  body: String,
  reaction: String,
  breakPoint: Boolean,
  detail: String
});

//module.exports = mongoose.model('Answer', AnswerSchema);
module.exports = AnswerSchema;