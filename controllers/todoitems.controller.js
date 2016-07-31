var Todo = require('../models/TodoItem.js');

exports.list = function(req, res, next) {
	Todo.find({}).sort('-creation_date').exec(function(err, todos) {
		if (err) return next(err);

		else res.json(todos);
	});
};

exports.create = function(req, res, next) {
	var todo = new Todo(req.body);
	todo.save(function(err) {
		if (err) return next(err);
		else res.json(todo);
	});
};