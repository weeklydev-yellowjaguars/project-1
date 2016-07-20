(function(app) {

    app.AppComponent =
    ng.core.Component({
        selector: 'app-main',
        template: '<app-header>Loading Header...</app-header><app-new-item></app-new-item>',
        directives: [app.HeaderComponent, app.NewItemComponent]
    })
    .Class({
        constructor: function() {
        }
    });

})(window.app || (window.app = {}));
