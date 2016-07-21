(function(app) {

    app.AppComponent =
    ng.core.Component({
        selector: 'app-main',
        template: '<app-new-item>New Item...</app-new-item><br /><br /><h1>Todo List</h1>',
        providers: [app.TodoItemService]
    })
    .Class({
        constructor: [app.TodoItemService, function(todoItemService) {
            todoItemService.getTodoItems();
        }]
    });

})(window.app || (window.app = {}));
