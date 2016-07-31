var User = require('../models/User.js');

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