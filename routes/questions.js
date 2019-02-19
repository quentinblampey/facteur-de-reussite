var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/Question');
var construct = require('../models/Question.construct');

/* GET ALL Questions */

router.get('/', function(req, res, next) {
  Question.find(function (err, questions) {
    if (err) return next(err);
    res.json(questions);
  });
});


/* GET SINGLE Question BY ID OF PREVIOUS ANSWER */
router.get('/:idQ', function(req, res, next) {
  Question.findOne({idQ: req.params.idQ}, function (err, post) {
    if (err) return next(err);
    if (post.personalized) {
      // post.construct(req.body.details) 
      post = construct(post,req.body.details)
    }
    res.json(post);
  });
});

/* SAVE Question */
router.post('/', function(req, res, next) {
  Question.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Question */
router.put('/:id', function(req, res, next) {
  Question.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Question */
router.delete('/:id', function(req, res, next) {
  Question.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;