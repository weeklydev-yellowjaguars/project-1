(function(app) {
    app.AppComponent =
    ng.core.Component({
        selector: 'app-main',
        template: '<app-new-item>New Item...</app-new-item><br /><br /><h1>Todo List</h1>'
    })
    .Class({
        constructor: function() {
        }
    });

})(window.app || (window.app = {}));
