var construct = function(question,details) {
    switch (question.idQ) {
      case 2:
        question.body = question.persoBody[0] + " " + details.name + " " + question.persoBody[1];
      case 7:
        question.body = question.persoBody[0] + " " + details.sportBeforeComing + " " + question.persoBody[1];
      case 10:
        question.body = question.persoBody[0] + " " + details.sportNow + " " + question.persoBody[1];
      case 11:
        question.body = question.persoBody[0] + " " + details.sportNow + " " + question.persoBody[1];
      case 12:
        question.body = question.persoBody[0] + " " + details.sportNow + " " + question.persoBody[1];
    }
    return question;
  };

module.exports = construct;