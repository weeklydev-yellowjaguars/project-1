(function(app) {

    function TodoItem(content, priority) {
        this.content = content || '';
        this.priority = priority || 0;
    }

    app.NewItemComponent =
    ng.core.Component({
        selector: 'app-new-item',
        templateUrl: 'app/components/new-item/view.html',
        providers: [app.TodoItemService]
    })
    .Class({
        constructor: [app.TodoItemService, function(todoItemService) {
            this.todoItemService = todoItemService;

            this.model = new TodoItem();
            this.submitted = false;
        }],
        submitForm: function() {
            this.submitted = true;

            // not all fields are valid, so stop here
            if (this.model.content.length < 3) {
                return false;
            }

            this.todoItemService.addTodoItem(this.model);

            // reset the form fields and status
            this.model = new TodoItem();
            this.submitted = false;

            return false;
        }
    });

})(window.app || (window.app = {}));
