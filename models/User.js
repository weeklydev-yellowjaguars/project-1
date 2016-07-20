var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, trim: true, index: true, unique: true},
    password: {type: String, select: false, trim: true},
    email: {type: String, trim: true, index: true, unique: true}
});

module.exports = mongoose.model('User', userSchema);
