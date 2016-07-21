var fs = require('fs');

var crypto = require('crypto-js');
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
    // we can't request the reset without the email
    if (!req.body || !req.body.email) {
        return res.status(400).send(JSON.stringify({error: true, message: 'missing email'}));
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if (err) return res.send(err);
        if (!user) return res.sendStatus(404);

        // generate new password
        var new_password = crypto.AES.encrypt(user.username + Date.now() + user.email, 'yellowjaguars123').toString();
        new_password = [
            new_password[parseInt(Math.random() * (new_password.length - 1) + 1)],
            new_password[parseInt(Math.random() * (new_password.length - 1) + 1)],
            new_password[parseInt(Math.random() * (new_password.length - 1) + 1)],
            new_password[parseInt(Math.random() * (new_password.length - 1) + 1)],
            new_password[parseInt(Math.random() * (new_password.length - 1) + 1)],
            new_password[parseInt(Math.random() * (new_password.length - 1) + 1)],
            new_password[parseInt(Math.random() * (new_password.length - 1) + 1)],
            new_password[parseInt(Math.random() * (new_password.length - 1) + 1)],
            new_password[parseInt(Math.random() * (new_password.length - 1) + 1)],
            new_password[parseInt(Math.random() * (new_password.length - 1) + 1)],
        ].join('');

        // read in the HTML email to send
        fs.readFile('./views/reset_email.html', 'utf8', function(err, data) {
            if (err) return res.send(err);

            // replace plaeholder content in the email body with new values
            data = data.replace('{{new_password}}', new_password);
            data = data.replace('{{username}}', user.username);

            // API key: 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
            nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: 'password_reset',
                    pass: '$.Reset123'
                }
            }).sendMail({
                from: 'Yellow Jaguars <weeklydev.yellowjaguars@gmail.com>',
                to: user.email,
                subject: 'Password Reset',
                text: 'Your new password at http://localhost:3000/login is ' + new_password,
                html: data
            }, function(err, info) {
                if (err) return res.send(err);

                res.send();
            });
        });
    });
});

module.exports = router;
