(function(app) {

    app.AppComponent =
    ng.core.Component({
        selector: 'app-main',
        templateUrl: 'app/home.html',
        directives: [app.HeaderComponent, app.NewItemComponent, app.ItemsListComponent],
        providers: [app.TodoItemService]
    })
    .Class({
        constructor: [app.TodoItemService, function(todoItemService) {
        }]
    });

})(window.app || (window.app = {}));
