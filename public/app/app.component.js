(function(app) {

    app.AppComponent =
    ng.core.Component({
        selector: 'app-main',
        template: '<app-header>Loading Header...</app-header><app-new-item></app-new-item>',
        directives: [app.HeaderComponent, app.NewItemComponent],
        providers: [app.TodoItemService]
    })
    .Class({
        constructor: [app.TodoItemService, function(todoItemService) {
            todoItemService.getTodoItems(function(data) {
            });
        }]
    });

})(window.app || (window.app = {}));
