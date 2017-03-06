'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$http','$templateCache',function($scope,$http,$templateCache) {
	$http({
		method : 'JSONP',
		url : 'http://192.168.1.102:8081/Clock/hello/json?callback=JSON_CALLBACK',
		cache : $templateCache
	}).then(function successCallback(response) {
		$scope.accounts = response.data;
		// this callback will be called asynchronously
		// when the response is available
	}, function errorCallback(response) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
	});
}]);
