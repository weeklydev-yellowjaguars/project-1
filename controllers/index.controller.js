exports.render = function(req, res) {
	console.log(req.user);

	res.render('index', {
		title: 'Express',
		user: req.user ? req.user.username : ''
	});
};