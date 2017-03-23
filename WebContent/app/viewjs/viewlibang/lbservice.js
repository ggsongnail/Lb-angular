'use strict';

var app =  angular.module('myApp.session', []);
app.value('SessionStatus',{isAnonymus:true,token:"",userName:"Jony"});
/*app.factory('myInterceptor', ['$log', '$q', 'someAsyncService', function($log, $q, someAsyncService) {
    $log.debug('$log is here to show you that this is a regular factory with injection');
    var requestInterceptor = {
            request: function(config) {
                var deferred = $q.defer();
                someAsyncService.doAsyncOperation().then(function() {
                    // Asynchronous operation succeeded, modify config accordingly
                    deferred.resolve(config);
                }, function() {
                    // Asynchronous operation failed, modify config accordingly
                    deferred.resolve(config);
                });
                return deferred.promise;
            }
        };

        return requestInterceptor;
}]);*/
app.factory('sessionInjector', ['$location', '$cookies', '$cookieStore', function($location, $cookies, $cookieStore) {
    var sessionInjector = {
            request: function(config) {
            	config.headers = config.headers || {};
                if ($cookies.get('isAnonymus')=='false') {
                	config.headers['x-session-token'] = $cookies.get('token');
                }else{
                	$location.path('/viewlibang/adminuser/login');
                }
                return config;
            }
        };
        return sessionInjector;
}]);

app.config(['$httpProvider', function($httpProvider) {
    //$httpProvider.interceptors.push('myInterceptor');
    //$httpProvider.interceptors.push('sessionInjector');
}]);




