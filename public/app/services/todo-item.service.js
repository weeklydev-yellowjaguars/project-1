(function(app) {

    app.TodoItemService =
    ng.core.Injectable().Class({
        constructor: function() {
            this.e_itemAdded = new ng.core.EventEmitter();
            this.e_itemsRetrieved = new ng.core.EventEmitter();

            this.todoItems = [];

            this.getTodoItems();
        },
        addTodoItem: function(item, cb) {
            // add the item to the list on the front-end
            this.todoItems.push(item);

            // alert components to the item being added to the front-end
            this.e_itemAdded.emit(item);

            // we don't want to set a specific ID
            delete item._id;

            // send the item to the server
            $.ajax({
                url: '/todos/',
                data: item,
                type: 'post',

                success: function(data, textStatus, xhr) {
                },
                finally: function() {
                    console.log('hi!');
                }
            });
        },
        getTodoItems: function(options, cb) {
            // var data = [
            //     {_id: 'a7ffag6r6adsf6g87g6fas876sd86g7f', content: 'Lorem ipsum dolor sit amet', priority: 0, date_created: Date.now()},
            //     {_id: 'b7ffag6r6adsf6g87g6fas876sd86g7f', content: 'consectetur adipisicing elit', priority: 0, date_created: Date.now()},
            //     {_id: 'c7ffag6r6adsf6g87g6fas876sd86g7f', content: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', priority: 1, date_created: Date.now()},
            //     {_id: 'd7ffag6r6adsf6g87g6fas876sd86g7f', content: 'Ut enim ad minim veniam', priority: 0, date_created: Date.now()},
            //     {_id: 'e7ffag6r6adsf6g87g6fas876sd86g7f', content: 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', priority: 1, date_created: Date.now()},
            //     {_id: 'f7ffag6r6adsf6g87g6fas876sd86g7f', content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur', priority: 1, date_created: Date.now()},
            //     {_id: 'g7ffag6r6adsf6g87g6fas876sd86g7f', content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', priority: 2, date_created: Date.now()},
            //     {_id: 'h7ffag6r6adsf6g87g6fas876sd86g7f', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod', priority: 0, date_created: Date.now()},
            //     {_id: 'i7ffag6r6adsf6g87g6fas876sd86g7f', content: 'consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna', priority: 0, date_created: Date.now()},
            //     {_id: 'j7ffag6r6adsf6g87g6fas876sd86g7f', content: 'exercitation ullamco laboris nisi ut aliquip', priority: 2, date_created: Date.now()},
            // ];
            var _this = this;
            var data = [];

            $.ajax({
                url: '/todos/',
                data: {},
                type: 'get',

                success: function(data, textStatus, xhr) {
                    _this.todoItems = data;

                    // alert components to items being retrieved
                    _this.e_itemsRetrieved.emit();

                    if (typeof cb === 'function') cb(_this.todoItems);
                }
            });
        },
        updateItem: function(item, cb) {
            if (typeof cb !== 'function') cb = function() {};

            // send the updated item to the server
            $.ajax({
                url: '/todos/' + item._id,
                data: item,
                type: 'put',

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

            // go through the items and remove the one with the same ID is the given item
            this.todoItems = this.todoItems.filter(function(_item) {
                return _item._id !== item._id;
            });

            $.ajax({
                data: item,
                type: 'delete',
                url: '/todos/' + item._id,

                beforeSend: function() {
                    // if a temp ID is set, don't send to the server because it won't recognize it
                    if (item._id.indexOf('tmp_') !== -1) return false;
                },

                success: function(data, status, xhr) {
                    cb(null, item);
                },
                error: function(xhr, errorType, error) {
                    cb(error);
                }
            });
        }
    });

})(window.app || (window.app = {}));
