(function(app) {

    app.NewItemComponent =
    ng.core.Component({
        selector: 'app-new-item',
        templateUrl: 'app/components/new-item/view.html'
    })
    .Class({
        constructor: function() {
            // we can now use `loggedIn` as a variable in our templates
            this.loggedIn = false;

            this.new_item = {
                content: {error: false, value: ''},
                priority: 'low'
            };
        },
        submitForm: function() {
            if (this.new_item.content.value.length < 3) {
                this.new_item.content.error = 'Please enter at least 3 characters';

                return false;
            } else {
                this.new_item.error = false;
            }

            if (['low', 'medium', 'high'].indexOf(this.new_item.priority) < 0) {
                this.new_item.priority = 0;
            }

            return false;
        }
    });

})(window.app || (window.app = {}));
