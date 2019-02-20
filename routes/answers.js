var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Answer = require('../models/Answer.js');

/* GET ALL Answers */

router.get('/', function(req, res, next) {
  Answer.find(function (err, answers) {
    if (err) return next(err);
    res.json(answers);
  });
});


/* SAVE Answer */
/*
router.post('/', function(req, res, next) {
  Answer.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/

/* Send Answer */

router.post('/', function(req, res, next) {
  user = req.body.user;
  answer = req.body.answer;
  user.details[req.body.field] = answer.detail;
  if (answer.idQ == 0) {
    user.save();
    res.json(post);
  }
  else {
    if (answer.breakPoint) {
      user.nextBreak.push(answer.idQ);
    }
    else {
      user.currentBreak.push(answer.idQ);
    }
    user.save();
    res.json(post);
  }
});

/* UPDATE Answer */
router.put('/:id', function(req, res, next) {
  Answer.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Answer */
router.delete('/:id', function(req, res, next) {
  Answer.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;