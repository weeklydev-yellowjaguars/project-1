var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoItemSchema = new Schema({
    author_id: String,
    creation_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    priority: {type: Number, default: 0},
    completed: {type: Boolean, default: false}
});

module.exports = mongoose.model('TodoItem', todoItemSchema);