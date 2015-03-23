window.onerror = function(message, url, line, column, error){
    console.error(error.message);
};

angular.module( 'demoApp', [
    'ngMessages',
    'templates',
    'ui.bootstrap',
    'ui.router',
    'ui.validate',
    'ui.route',
    'ngTable',
    'students',
    'restangular'
])
.config([
    '$stateProvider',
    '$urlRouterProvider',
    'RestangularProvider',
    function AppConfig ( $stateProvider, $urlRouterProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:8800/api/');
        $urlRouterProvider.otherwise( '/' );
    }
])
.run( [
    '$rootScope',
    '$state',
    function run($rootScope, $state) {

        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){ 
            console.log('State not Found');
            console.log(unfoundState.to);
            console.log(unfoundState.toParams);
            console.log(unfoundState.options);
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            console.log('State Error Event: ', event);
            console.log('Error From: ', fromState, fromParams);
            console.log('Error To: ', toState, toParams);
            if (error.message) {
                console.log('State Change Error: ', error.message);
            } else {
                console.log('State Change Error: ', error);
            }
        });
    }
]);
