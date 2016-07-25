(function(app) {

    app.TodoItemService =
    ng.core.Injectable().Class({
        constructor: function() {
            var ajax = $.ajax({
                url: '/todos/',
                data: {},

                // callbacks
                success: function(data, status, xhr) {
                    console.info(data);
                },
                error: function(xhr, type, error) {
                    console.warn(error);
                }
            });
        },
        addTodoItem: function(item, cb) {
            console.log(item);
        },
        getTodoItems: function(options, cb) {
            var data = [
                {content: 'Lorem ipsum dolor sit amet', priority: 'low', date_created: Date.now()},
                {content: 'consectetur adipisicing elit', priority: 'low', date_created: Date.now()},
                {content: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', priority: 'low', date_created: Date.now()},
                {content: 'Ut enim ad minim veniam', priority: 'low', date_created: Date.now()},
                {content: 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', priority: 'low', date_created: Date.now()},
                {content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur', priority: 'low', date_created: Date.now()},
                {content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', priority: 'low', date_created: Date.now()},
                {content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod', priority: 'low', date_created: Date.now()},
                {content: 'consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna', priority: 'low', date_created: Date.now()},
                {content: 'exercitation ullamco laboris nisi ut aliquip', priority: 'low', date_created: Date.now()},
            ];

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
        }
    });

})(window.app || (window.app = {}));
