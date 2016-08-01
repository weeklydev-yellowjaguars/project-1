var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoItemSchema = new Schema({
    author_id: String,
    creation_date: {type: Date, default: Date.now},
    content: {type: String, default: ''},
    priority: {type: String, default: 'low'},
    completed: {type: Boolean, default: false}
});

module.exports = mongoose.model('TodoItem', todoItemSchema);
