(function(app) {

    app.HeaderComponent =
    ng.core.Component({
        selector: 'app-header',
        templateUrl: 'app/components/header/view.html'
    })
    .Class({
        constructor: function() {
            // we can now use `loggedIn` as a variable in our templates
            this.loggedIn = false;
        }
    });

})(window.app || (window.app = {}));
