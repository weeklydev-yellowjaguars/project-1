var Todo = require('../models/TodoItem.js');

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

exports.create = function(req, res) {
	var todo = null;

	// mongoose needs to set the _id field
	delete req.body._id;

	todo = new Todo(req.body);
	todo.author_id = req.user.id;
	todo.save(function(err) {
		if (err)
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		else
			res.json(todo);
	});
};

exports.list = function(req, res) {
	Todo.find({ author_id: req.user.id }).sort('-creation_date').exec(function(err, todos) {
		if (err)
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		else
			res.json(todos);
	});
};

exports.read = function(req, res) {
	res.json(req.todo);
};

exports.todoByID = function(req, res, next, id) {
	Todo.findOne({ _id: id }, function(err, todo) {
		if (err) {
			return next(err);
		}
		else {
			req.todo = todo;
			next();
		}
	});
};

exports.update = function(req, res) {
	var update = req.body;
	console.log(req.todo);
	console.log(req.todo._id);
	Todo.findByIdAndUpdate(req.todo._id, update, { new: true }, function(err, user) {
		if (err)
			return next(err);
		else
			res.json(user);
	});
};

exports.delete = function(req, res) {
	var todo = req.todo;
	todo.remove(function(err) {
		if (err)
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		else
			res.json(todo);
	})
}

exports.hasAuthorization = function(req, res, next) {
	if (req.todo.author_id != req.user.id)
		return res.status(403).send({
			message: 'User is not authorized'
		});

	next();
};