(function(app) {
  document.addEventListener('DOMContentLoaded', function() {
    ng.platformBrowserDynamic.bootstrap(app.AppComponent);
    ng.platformBrowserDynamic.bootstrap(app.HeaderComponent);
  });
})(window.app || (window.app = {}));
