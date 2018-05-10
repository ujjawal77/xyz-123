var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://angrynerds:123456@ds119350.mlab.com:19350/fifa-predictor-ng-attack';


// Get prediction for all match
router.get('/', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("connected to server successfully");
    var collection = db.collection('voting');
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      res.json(docs);
      db.close();
    });
  });
});

// Get vote count of a match
  router.get('/:match', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("connected to server successfully");
    var collection = db.collection('voting');
    collection.find({'name' : req.params.match}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records", docs);
      res.json(docs);
      db.close();
    });
  });
});

// Post vote
router.post('/', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("connected to server successfully");
    var collection = db.collection('voting');
    var query = {};
    if (req.body.team === 'team1'){
      query['team1'] = 1
    }else {
      query['team2'] = 1
    }
    collection.updateOne({'name' : req.body.match}, {$inc: query}, function(err, docs) {
      assert.equal(err, null);
      console.log("Updated the following record", docs);
      res.json(docs);
      db.close();
    });
  });
});

module.exports = router;
