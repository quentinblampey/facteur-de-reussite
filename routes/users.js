var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');



/* USER CREATION : IF USERNAME ALREADY EXISTS, RETURNS THE CORRESPONDING ACCOUNT, ELSE IT CREATES THE USER AND RETURNS THE ACCOUNT */
router.get('/initget/', function(req, res, next) {
  User.findOne({pseudo : req.body.pseudo}, function (err, post) {
    if (err) { return next(err) };
    if (post === null) {
      console.log("create !")

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
      User.create({pseudo: req.body.pseudo, currentBreak : firstTrees, nextBreak : [], details: {name: "", sport: ""}}, function (err, post) {
        if (err) return next(err);
        console.log("Created !")
        res.json(post);
      });
    } else {
    res.json(post);}
  });
});



/* GET ALL UserS */

router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) {return next(err)};
    res.json(users);
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