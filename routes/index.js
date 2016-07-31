var express = require('express');
var router = express.Router();

var index = require('../controllers/index.controller.js');

/* GET home page. */
router.get('/', index.render);

module.exports = router;
