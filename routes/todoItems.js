var express = require('express');
var router = express.Router();

var TodoItem = require('../models/TodoItem.js');

/* GET to retrieve all todo items */
router.get('/', function(req, res, next) {
    TodoItem.find({}, function(err, items) {
        if (err) throw err;

        res.send(JSON.stringify(items));
    });
});

/* POST to create new todo item */
router.post('/', function(req, res, next) {
    new TodoItem({content: req.body.content}).save();

    // 201 - Created
    res.sendStatus(201);
});

module.exports = router;
