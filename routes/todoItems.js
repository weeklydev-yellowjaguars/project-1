var express = require('express');
var router = express.Router();

var todos = require('../controllers/todoitems.controller.js');
var users = require('../controllers/users.controller.js');

router.get('/', users.requiresLogin, todos.list);
router.post('/', users.requiresLogin, todos.create);

router.param('todoId', todos.todoByID);

router.get('/:todoId', todos.read);
router.put('/:todoId', users.requiresLogin, todos.hasAuthorization, todos.update);
router.delete('/:todoId', users.requiresLogin, todos.hasAuthorization, todos.delete);

module.exports = router;