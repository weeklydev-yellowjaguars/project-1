(function(app) {

    var e_itemAdded = new ng.core.EventEmitter();

    app.TodoItemService =
    ng.core.Injectable().Class({
        constructor: function() {
            this.e_itemAdded = e_itemAdded;
            this.todoItems = [];

            this.getTodoItems();
        },
        addTodoItem: function(item, cb) {
            this.todoItems.push(item);

            this.e_itemAdded.emit(item);

            // if logged in, save to the database
        },
        getTodoItems: function(options, cb) {
            var data = [
                {_id: 'a7ffag6r6adsf6g87g6fas876sd86g7f', content: 'Lorem ipsum dolor sit amet', priority: 0, date_created: Date.now()},
                {_id: 'b7ffag6r6adsf6g87g6fas876sd86g7f', content: 'consectetur adipisicing elit', priority: 0, date_created: Date.now()},
                {_id: 'c7ffag6r6adsf6g87g6fas876sd86g7f', content: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', priority: 1, date_created: Date.now()},
                {_id: 'd7ffag6r6adsf6g87g6fas876sd86g7f', content: 'Ut enim ad minim veniam', priority: 0, date_created: Date.now()},
                {_id: 'e7ffag6r6adsf6g87g6fas876sd86g7f', content: 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', priority: 1, date_created: Date.now()},
                {_id: 'f7ffag6r6adsf6g87g6fas876sd86g7f', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur', priority: 1, date_created: Date.now()},
                {_id: 'g7ffag6r6adsf6g87g6fas876sd86g7f', content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', priority: 2, date_created: Date.now()},
                {_id: 'h7ffag6r6adsf6g87g6fas876sd86g7f', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod', priority: 0, date_created: Date.now()},
                {_id: 'i7ffag6r6adsf6g87g6fas876sd86g7f', content: 'consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna', priority: 0, date_created: Date.now()},
                {_id: 'j7ffag6r6adsf6g87g6fas876sd86g7f', content: 'exercitation ullamco laboris nisi ut aliquip', priority: 2, date_created: Date.now()},
            ];
            data = [];

            this.todoItems = data;

            // if no callback is given, just return the data
            if (options === undefined && cb === undefined) {
                return data;
            }

            // this lets us accept either options and a callback, or just a callback
            if (cb === undefined) {
                cb = options;
                options = {};
            }

            cb(data);
        },
        updateItem: function(item, cb) {
            if (typeof cb !== 'function') cb = function() {};

            // send the updated item to the server
            $.ajax({
                data: item,
                type: 'put',
                url: '/todos/' + item._id,

                success: function(data, status, xhr) {
                    cb(null, item);
                },
                error: function(xhr, errorType, error) {
                    console.error(error);

                    cb(error);
                }
            });
        },
        removeItem: function(item, cb) {
            if (typeof cb !== 'function') cb = function() {};

            $.ajax({
                data: item,
                type: 'delete',
                url: '/todos/' + item._id,

                success: function(data, status, xhr) {
                    cb(null, item);
                },
                error: function(xhr, errorType, error) {
                    console.log(error);

                    cb(error);
                }
            });
        }
    });

})(window.app || (window.app = {}));
