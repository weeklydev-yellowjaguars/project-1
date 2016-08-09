var express = require('express');
var router = express.Router();
var passport = require('passport');

var auth = require('../controllers/auth.controller.js');

router.get('/register', auth.renderRegister);
router.post('/register', auth.register);

router.get('/login', auth.renderLogin);
router.post('/login', passport.authenticate('local', {
	failureRedirect: '/login',
	failureFlash: true
}), function(req, res, next) {
    req.session.save(function(err) {
        if (err) return next(err);
        
        res.redirect('/');
    });
});

router.get('/logout', auth.logout);

module.exports = router;
