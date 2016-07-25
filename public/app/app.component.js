(function(app) {

    app.AppComponent =
    ng.core.Component({
        selector: 'app-main',
        template: '<app-header>Loading Header...</app-header><app-new-item></app-new-item>',
        directives: [app.TodoItemService, app.HeaderComponent, app.NewItemComponent]
    })
    .Class({
        constructor: [app.TodoItemService, function(todoItemService) {
            todoItemService.getTodoItems(function(data) {
                console.log(data);
            });
        }]
    });

})(window.app || (window.app = {}));
