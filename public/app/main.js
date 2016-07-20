(function(app) {

    document.addEventListener('DOMContentLoaded', function() {
        ng.platformBrowserDynamic.bootstrap(app.AppComponent);
        ng.platformBrowserDynamic.bootstrap(app.HeaderComponent);
        ng.platformBrowserDynamic.bootstrap(app.NewItemComponent);
    });

})(window.app || (window.app = {}));
