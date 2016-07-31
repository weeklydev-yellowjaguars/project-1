var express = require('express');
var router = express.Router();
var passport = require('passport');

var users = require('../controllers/users.controller.js');

router.get('/register', users.renderRegister);
router.post('/register', users.register);

router.get('/login', users.renderLogin);
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

router.get('/logout', users.logout);

module.exports = router;