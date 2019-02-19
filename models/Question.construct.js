var construct = function(question,details) {
    switch (question.idQ) {
      case 2:
        question.body = question.persoBody[0] + " " + details.name + " " + question.persoBody[1];
    }
    return question;
  };

module.exports = construct;