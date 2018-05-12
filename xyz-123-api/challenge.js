var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/challenge';


// Get users
router.get('/', function (req, res, next) {
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
});

// Post user
router.post('/', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("connected to server successfully");
    var collection = db.collection('users');
    collection.updateOne(
      {
        userId: req.body.id
      },
      {
        $set: {
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
});

module.exports = router;
