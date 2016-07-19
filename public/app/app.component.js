(function(app) {
    app.AppComponent =
    ng.core.Component({
        selector: 'app-main',
        template: '<h1>Hello</h1>'
    })
    .Class({
        constructor: function() {
            this.loggedIn = true;
            this.isAdmin = false;
        }
    });

})(window.app || (window.app = {}));
