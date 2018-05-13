var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/challenge';


// Get users
router.get('/users', function (req, res, next) {
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

// Get challenges for a user
router.get('/challenges/:userId', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("connected to server successfully");
    var collection = db.collection('challenges');
    collection.find({
      $or: [
        {
          'userFrom.userId': req.params.userId
        },
        {
          'userTo.userId': req.params.userId
        }
      ]
    }).toArray(function (err, docs) {
      assert.equal(err, null);
      res.json(docs);
      db.close();
    });
  });
});

// Get user
router.get('/user/:userId', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      assert.equal(null, err);
      console.log("connected to server successfully");
      var collection = db.collection('users');
      collection.findOne(
        {
          userId: req.params.userId
        },
        function (err, docs) {
          assert.equal(err, null);
          res.json(docs);
          db.close();
        }
      );
    });
});

// Post user
router.post('/user', function (req, res, next) {
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
});

// Post challenge
router.post('/challenge', function (req, res, next) {
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
});

// Put challenge
router.put('/challenge', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("connected to server successfully");
    var collection = db.collection('challenges');
    collection.updateOne(
      {
        _id: new ObjectID(req.body.challengeId)
      },
      {
        $set: {
          winningUserId: req.body.winningUserId,
          isTie: req.body.isTie
        }
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
// Put challenge vote
router.put('/vote', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("connected to server successfully");
    var collection = db.collection('challenges');
    collection.updateOne(
      {
        _id: new ObjectID(req.body.challengeId),
        'userFrom.userId': req.body.userId
      },
      {
        $set: {
          'userFrom.votedTeam': req.body.votedTeam
        }
      },
      function (err, docs) {
        assert.equal(err, null);
        console.log("Updated the following record", docs);
        collection.updateOne(
          {
            _id: new ObjectID(req.body.challengeId),
            'userTo.userId': req.body.userId
          },
          {
            $set: {
              'userTo.votedTeam': req.body.votedTeam
            }
          },
          function (err, docs) {
            assert.equal(err, null);
            console.log("Updated the following record", docs);
            res.json(docs);
            db.close();
          }
        );
      }
    );
  });
});

module.exports = router;
