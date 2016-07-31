var User = require('../models/User.js');
var passport = require('passport');

var getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	}
	else {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}

	return message;
}

exports.renderLogin = function(req, res, next) {
	if (!req.user) {
		res.render('login', {
			title: 'Login form',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.renderRegister = function(req, res, next) {
	if (!req.user) {
		res.render('register', {
			title: 'Register form',
			messages: req.flash('error')
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.register = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		user.provider = 'local';
		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/auth/register');
			}

			req.login(user, function(err) {
				if (err)
					return next(err);

				return res.redirect('/');
			});
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.create = function(req, res, next) {
	var user = new User(req.body);
	user.save(function(err) {
		if (err)
			return next(err);
		else
			res.json({user});
	});
};

exports.list = function(req, res, next) {
	User.find({}).select({ password: 0 }).exec(function(err, users) {
		if (err)
			return next(err);
		else
			res.json(users);
	});
};

exports.read = function(req, res) {
	var user = req.user;
	delete user.password;	// don't return the password
	res.json(user);
};

exports.userByID = function(req, res, next, id) {
	User.findOne({ _id: id }, function(err, user) {
		if (err) {
			return next(err);
		}
		else {
			req.user = user;
			next();
		}
	});
};

exports.update = function(req, res, next) {
	var update = req.body;
	delete update.password;		// don't update the password
	User.findByIdAndUpdate(req.user.id, update, { new: true }, function(err, user) {
		if (err)
			return next(err);
		else
			res.json(user);
	});
};

exports.delete = function(req, res, next) {
	req.user.remove(function(err) {
		if (err)
			return next(err);
		else
			res.json(req.user);
	});
};