var express = require('express');
var router = express.Router();

var users = require('../controllers/users.controller.js');

router.get('/', users.list);
router.post('/', users.create);

router.param('userId', users.userByID);

router.get('/:userId', users.read);
router.put('/:userId', users.update);
router.delete('/:userId', users.delete);

module.exports = router;