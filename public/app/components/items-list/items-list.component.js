(function(app) {

    app.ItemsListComponent =
    ng.core.Component({
        selector: 'app-items-list',
        templateUrl: 'app/components/items-list/view.html'
    })
    .Class({
        /**
        *** Constructor
        **/
        constructor: [app.TodoItemService, function(todoItemService) {
            var _this = this;

            this.todoItemService = todoItemService;

            // when items are retrieved by the service, update the list
            this.todoItemService.e_itemsRetrieved.subscribe(function(items) {
                _this.todoItems = _this.todoItemService.todoItems;
            });

            // add the initial service items to the list
            this.todoItems = this.todoItemService.todoItems;
        }],
        /**
        *** When the enter key is pressed on the content box, exit edit mode and send the updated
        *** item to the service.
        **/
        onContentKeypress: function(ev, item, $item, $content) {
            if (ev.keyCode !== 13) return true;

            ev.preventDefault();

            $($content).removeAttr('contenteditable');
            $($item).removeClass('is-active');

            this.todoItemService.updateItem(item);
        },
        /**
        *** Make the item content editable and give it focus.
        **/
        editItem: function($item, item) {
            var $content = $('.td-ItemsList_Content', $item);

            $($item).addClass('is-active');
            $content.attr('contenteditable', true);
            $content.focus();
        },
        /**
        *** Remove the item from the front-end list, then send a remove request to the service.
        **/
        removeItem: function($item, item) {
            var _this = this;

            $($item).addClass('is-hiding');

            // make sure the 150ms delay matches up with the CSS transition speed
            window.setTimeout(function() {
                $($item).hide();

                // ask the service to remove the item
                _this.todoItemService.removeItem(item, function(err) {
                    _this.todoItems = _this.todoItemService.todoItems;
                });
            }, 150);

        }
    });

})(window.app || (window.app = {}));
