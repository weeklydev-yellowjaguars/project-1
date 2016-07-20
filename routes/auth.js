var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

var User = require('../models/User.js');

router.post('/login', function(req, res, next) {
    var query = {}; // will hold attributes used to query the database

    // make sure we receive a password and either a username or email for login
    if (!req.body || (!req.body.username && !req.body.email) || !req.body.password) {
        return res.send(401, JSON.stringify({error: true, message: 'invalid login'}));
    }

    // we can accept either a username or email for login
    if (req.body.username) query.username = req.body.username;
    else query.email = req.body.email;

    // add the password to the query
    query.password = req.body.password;

    // try to find the user with the supplied credentials
    User.findOne(query, function(err, user) {
        if (err) return res.send(err);

        // no user was found with the login credentials
        if (!user) {
            return res.send(401, JSON.stringify({error: true, message: 'invalid login'}));
        }

        // proper credentials were given, so return the User object
        res.send(JSON.stringify(user));
    });
});

router.post('/reset', function(req, res, next) {
    // API key: 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
    var transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: 'password_reset',
            pass: '$.Reset123'
        }
    });

    // load HTML email and replace placeholders

    transporter.sendMail({
        from: 'Yellow Jaguars <weeklydev.yellowjaguars@gmail.com>',
        to: 'rideron89@gmail.com',
        subject: 'Password Reset',
        text: 'You wished to reset your password?',
        html: '<h1>Password Reset</h1>'
    }, function(err, info) {
        if (err) return res.send(err);

        res.send(JSON.stringify(info));
    });
});

module.exports = router;
