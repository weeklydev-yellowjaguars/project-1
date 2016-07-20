var mongoose = require('mongoose');

var todoItemSchema = new mongoose.Schema({
    author_id: String,
    creation_date: {type: Date, default: Date.now},
    content: {type: String, default: ''},
    priority: {type: String, default: 'low'}
});

module.exports = mongoose.model('TodoItem', todoItemSchema);
