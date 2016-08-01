var express = require('express');
var router = express.Router();
var passport = require('passport');

var auth = require('../controllers/auth.controller.js');

router.get('/register', auth.renderRegister);
router.post('/register', auth.register);

router.get('/login', auth.renderLogin);
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

router.get('/logout', auth.logout);

module.exports = router;