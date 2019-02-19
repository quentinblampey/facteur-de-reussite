var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

/* GET ALL UserS */

router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) {return next(err)};
    res.json(users);
  });
});


/* GET SINGLE User BY ID */
router.get('/:pseudo', function(req, res, next) {
  User.findById(req.params.pseudo, function (err, post) {
    if (err) { firstTrees = [
      {
        "idQ" : 1,
        "personalization": []
      },
      { 
        "idQ" : 2,
        "personalization" : []
      }
    ]
    User.create({pseudo: req.body.pseudo, currentBreak : firstTrees, nextBreak : [], details: {sport: ""}}, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });};
    res.json(post);
  });
});

/* USER CREATION : IF USERNAME ALREADY EXISTS, RETURNS THE CORRESPONDING ACCOUNT, ELSE IT CREATES THE USER AND RETURNS THE ACCOUNT */
router.get('/initget/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVES  A NEW User WITH ONLY A NAME SPECIFIED */
router.post('/', function(req, res, next) {
  firstTrees = [
    {
      "idQ" : 1,
      "personalization": []
    },
    { 
      "idQ" : 2,
      "personalization" : []
    }
  ]
  User.create({pseudo: req.body.pseudo, currentBreak : firstTrees, nextBreak : [], details: {sport: ""}}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE User */
router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE User */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;