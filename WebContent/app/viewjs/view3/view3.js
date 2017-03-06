'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope','$http','$templateCache',function($scope,$http,$templateCache) {
	$http({
		method : 'JSONP',
		url : 'http://192.168.1.102:8081/Clock/hello/json/1?callback=JSON_CALLBACK'
		//cache : $templateCache
	}).then(function successCallback(response) {
		$scope.account = response.data;
	}, function errorCallback(response) {
	});
	$scope.update = function(account){
		//var datajson = angular.toJson(account, true);
		var headers = new Headers();
		headers.append('Content-Type','application/x-www-form-urlencoded');
		$http.post('http://192.168.1.102:8081/Clock/hello/update',account,{
			headers:headers
		}).then(function(data){
			//success
			//alert(data.data.id);
			//$scope.account.name = "Jony King";
		},function(){
			alert('update failed');
		});
	};
}]);