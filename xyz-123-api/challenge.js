var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/challenge';


// Get users
router.get('/:endpoint', function (req, res, next) {
  if (req.params.endpoint === 'users') {
    MongoClient.connect(url, function (err, db) {
      assert.equal(null, err);
      console.log("connected to server successfully");
      var collection = db.collection('users');
      collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        res.json(docs);
        db.close();
      });
    });
  }
});

// Post user/challenge
router.post('/:endpoint', function (req, res, next) {
  if (req.params.endpoint === 'user') {
    MongoClient.connect(url, function (err, db) {
      assert.equal(null, err);
      console.log("connected to server successfully");
      var collection = db.collection('users');
      collection.updateOne(
        {
          userId: req.body.id
        },
        {
          $setOnInsert: {
            userId: req.body.id,
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            challengedUsers: []
          }
        },
        {
          upsert: true
        },
        function (err, docs) {
          assert.equal(err, null);
          console.log("Updated the following record", docs);
          res.json(docs);
          db.close();
        }
      );
    });
  } else if (req.params.endpoint === 'challenge') {
    // Update challenged users array of both the users
    MongoClient.connect(url, function (err, db) {
      assert.equal(null, err);
      console.log("connected to server successfully");
      var collection = db.collection('users');
      collection.updateOne(
        {
          userId: req.body.userFrom.userId
        },
        {
          $addToSet: {
            challengedUsers: req.body.userTo.userId
          }
        },
        function (err, docs) {
          assert.equal(err, null);
          console.log("Updated the following record", docs);
          db.close();
        }
      );
    });
    MongoClient.connect(url, function (err, db) {
      assert.equal(null, err);
      console.log("connected to server successfully");
      var collection = db.collection('users');
      collection.updateOne(
        {
          userId: req.body.userTo.userId
        },
        {
          $addToSet: {
            challengedUsers: req.body.userFrom.userId
          }
        },
        function (err, docs) {
          assert.equal(err, null);
          console.log("Updated the following record", docs);
          db.close();
        }
      );
    });
    // Insert challenge
    MongoClient.connect(url, function (err, db) {
      assert.equal(null, err);
      console.log("connected to server successfully");
      var collection = db.collection('challenges');
      collection.insertOne(
        {
          match: req.body.match,
          userFrom: req.body.userFrom,
          userTo: req.body.userTo,
          winningUserId: ''
        },
        function (err, docs) {
          assert.equal(err, null);
          console.log("Updated the following record", docs);
          res.json(docs);
          db.close();
        }
      );
    });
  }
});

module.exports = router;
