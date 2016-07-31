var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

module.exports = function() {
	var app = express();

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'CHANGETHIS'
	}));

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	return app;
}