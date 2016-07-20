(function(app) {

    function TodoItem(content, priority) {
        this.content = content || '';
        this.priority = priority || 'low';
    }

    app.NewItemComponent =
    ng.core.Component({
        selector: 'app-new-item',
        templateUrl: 'app/components/new-item/view.html'
    })
    .Class({
        constructor: function() {
            this.model = new TodoItem();
            this.submitted = false;
        },
        submitForm: function() {
            this.submitted = true;

            // not all fields are valid, so stop here
            if (this.model.content.length < 3 || ['low', 'medium', 'high'].indexOf(this.model.priority) === -1) {
                return false;
            }

            // add the item to the full list

            if (this.loggedIn)  {
                // send the item to the back-end to store in the database
            }

            // reset the form fields and status
            this.model = new TodoItem();
            this.submitted = false;

            return false;
        }
    });

})(window.app || (window.app = {}));
