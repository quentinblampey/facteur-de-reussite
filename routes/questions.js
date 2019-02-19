var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Question = require('../models/Question');

/* GET ALL Questions */

router.get('/', function(req, res, next) {
  Question.find(function (err, questions) {
    if (err) return next(err);
    res.json(questions);
  });
});


/* GET SINGLE Question BY ID OF PREVIOUS ANSWER */
router.get('/:idQ', function(req, res, next) {
  Question.findById(req.params.idQ, function (err, post) {
    if (err) return next(err);
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