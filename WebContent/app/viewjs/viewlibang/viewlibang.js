'use strict';

angular.module('myApp.viewlibang', ['ngRoute'])
//每次访问连接都会请求ctrl，处理完函数的跳转亦是
.config(['$routeProvider', function($routeProvider) {
  //字典表父级 
  $routeProvider.when('/viewlibang/dictionary/list', {
	templateUrl: 'view/dictionary/dictionaryList.html',
    controller: 'DictionaryCtrl'
  }).when('/viewlibang/dictionary/create', {
	    templateUrl: 'view/dictionary/dictionaryForm.html',
	    controller: 'DictionaryCtrl'
  }).when('/viewlibang/dictionary/update/:id', {
	    templateUrl: 'view/dictionary/dictionaryForm.html',
	    controller: 'DictionaryCtrl'
  });
  
  //字典表子级 
  $routeProvider.when('/viewlibang/dictionaryclassify/list', {
	templateUrl: 'view/dictionary/dictionaryClassifyList.html',
    controller: 'DictionaryClassifyCtrl'
  }).when('/viewlibang/dictionaryclassify/create', {
	    templateUrl: 'view/dictionary/dictionaryClassifyForm.html',
	    controller: 'DictionaryClassifyCtrl'
  }).when('/viewlibang/dictionaryclassify/update/:id', {
	    templateUrl: 'view/dictionary/dictionaryClassifyForm.html',
	    controller: 'DictionaryClassifyCtrl'
  });
  //材料分类
  $routeProvider.when('/viewlibang/materialclassify/list', {
		templateUrl: 'view/material/materialClassifyList.html',
	    controller: 'MaterialClassifyCtrl'
  }).when('/viewlibang/materialclassify/create', {
	    templateUrl: 'view/material/materialClassifyForm.html',
	    controller: 'MaterialClassifyCtrl'
  }).when('/viewlibang/materialclassify/update/:id', {
	    templateUrl: 'view/material/materialClassifyForm.html',
	    controller: 'MaterialClassifyCtrl'
  });
  
  //材料产品
  $routeProvider.when('/viewlibang/materialproduct/list', {
	  	templateUrl : 'view/material/materialProductList.html',
	  	controller : 'MaterialProductCtrl'
  }).when('/viewlibang/materialproduct/create', {
	  	templateUrl : 'view/material/materialProductForm.html',
	  	controller : 'MaterialProductCtrl'
  }).when('/viewlibang/materialproduct/update/:id', {
	  	templateUrl : 'view/material/materialProductForm.html',
	  	controller : 'MaterialProductCtrl'
  });
  
  //主要材料收费单
  $routeProvider.when('/viewlibang/materialmainbill', {
    templateUrl: 'view/bill/materialMainBill.html',
    controller: 'MaterialMainBillCtrl'
  });
  //辅助材料收费单
  $routeProvider.when('/viewlibang/assist', {
	templateUrl: 'view/viewlibangassist.html',
	controller: 'ViewLibangAssistCtrl'
  });
}])

.controller('DictionaryCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams) {
	var url = $location.url();
	//List页面
	if(url.indexOf('list')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Godspoom/dictionary/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			//console.log("success");
			$scope.now = new Date();
			$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
			
		}, function errorCallback(response) {
		});
	}
	
	//Ｕpdate页面
	if(url.indexOf('update')>-1){
		console.log("into update");
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Godspoom/dictionary/get/'+$routeParams.id+'?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.dictionary = response.data;
		}, function errorCallback(response) {
		});
	}
	$scope.back = function(){
		$location.path("/viewlibang/dictionary/list")
	}
	$scope.submit = function(dictionary){
		var headers = new Headers();
		headers.append('Content-Type','application/x-www-form-urlencoded');
		$http.post('http://192.168.1.103:8081/Godspoom/dictionary/save',dictionary,{
			headers:headers
		}).then(function(data){
			console.log(data);
			$location.path("/viewlibang/dictionary/list")
		},function(){
			console.log('create dictionary failed');
		});
	}
}])
.controller('DictionaryClassifyCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams){
	var url = $location.url();
	//List页面
	if(url.indexOf('list')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Godspoom/dictionaryclassify/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			//console.log("success");
			$scope.now = new Date();
			$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
			
		}, function errorCallback(response) {
		});
	}
	//Create页面
	if(url.indexOf('create')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Godspoom/dictionary/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.dictionarys = response.data;
		}, function errorCallback(response) {
		});
	}
	//Ｕpdate页面
	if(url.indexOf('update')>-1){
		console.log("into update");
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Godspoom/dictionaryclassify/get/'+$routeParams.id+'?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.dictionaryClassify = response.data.dictionaryClassify;
			$scope.dictionarys = response.data.dictionarys;
			//$scope.dictionaryClassify.dictionary.id = response.data.dictionaryClassify.dictionary;
		}, function errorCallback(response) {
		});
	}
	
	$scope.back = function(){
		$location.path("/viewlibang/dictionaryclassify/list")
	}
	$scope.submit = function(dictionaryClassify){
		var headers = new Headers();
		headers.append('Content-Type','application/x-www-form-urlencoded');
		$http.post('http://192.168.1.103:8081/Godspoom/dictionaryclassify/save',dictionaryClassify,{
			headers:headers
		}).then(function(data){
			console.log(data);
			$location.path("/viewlibang/dictionaryclassify/list")
		},function(){
			console.log('create dictionaryClassify failed');
		});
	}
}])
.controller('MaterialClassifyCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams){
	var url = $location.url();
	//List页面
	if(url.indexOf('list')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Godspoom/materialclassify/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			//console.log("success");
			$scope.now = new Date();
			$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
			
		}, function errorCallback(response) {
		});
	}
	//Create页面
	if(url.indexOf('create')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Godspoom/dictionaryclassify/listbymaterial/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.dictionaryClassifys = response.data;
		}, function errorCallback(response) {
		});
	}
	//Ｕpdate页面
	if(url.indexOf('update')>-1){
		console.log("into update");
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Godspoom/materialclassify/get/'+$routeParams.id+'?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.materialClassify = response.data.materialClassify;
			$scope.dictionaryClassifys = response.data.dictionaryClassifys;
			//$scope.dictionaryClassify.dictionary.id = response.data.dictionaryClassify.dictionary;
		}, function errorCallback(response) {
		});
	}
	
	$scope.back = function(){
		$location.path("/viewlibang/materialclassify/list")
	}
	$scope.submit = function(dictionaryClassify){
		var headers = new Headers();
		headers.append('Content-Type','application/x-www-form-urlencoded');
		$http.post('http://192.168.1.103:8081/Godspoom/materialclassify/save',dictionaryClassify,{
			headers:headers
		}).then(function(data){
			console.log(data);
			$location.path("/viewlibang/materialclassify/list")
		},function(){
			console.log('create materialclassify failed');
		});
	}
}])
.controller('MaterialProductCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams){
	var url = $location.url();
	//List页面
	if(url.indexOf('list')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Godspoom/materialproduct/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			//console.log("success");
			$scope.now = new Date();
			$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
			
		}, function errorCallback(response) {
		});
	}
	//Create页面
	if(url.indexOf('create')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Godspoom/materialclassify/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.materialClassifys = response.data;
		}, function errorCallback(response) {
		});
	}
	//Ｕpdate页面
	if(url.indexOf('update')>-1){
		console.log("into update");
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Godspoom/materialproduct/get/'+$routeParams.id+'?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.materialProduct = response.data.materialProduct;
			$scope.materialClassifys = response.data.materialClassifys;
			//$scope.dictionaryClassify.dictionary.id = response.data.dictionaryClassify.dictionary;
		}, function errorCallback(response) {
		});
	}
	
	$scope.back = function(){
		$location.path("/viewlibang/materialproduct/list")
	}
	$scope.submit = function(dictionaryClassify){
		var headers = new Headers();
		headers.append('Content-Type','application/x-www-form-urlencoded');
		$http.post('http://192.168.1.103:8081/Godspoom/materialproduct/save',dictionaryClassify,{
			headers:headers
		}).then(function(data){
			console.log(data);
			$location.path("/viewlibang/materialproduct/list")
		},function(){
			console.log('create materialproduct failed');
		});
	}
}])
.controller('MaterialMainBillCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams){
	$http({
		method : 'JSONP',
		url : 'http://192.168.1.103:8081/Godspoom/materialproduct/list/json?callback=JSON_CALLBACK',
		//cache : $templateCache
	}).then(function successCallback(response) {
		//console.log("success");
		$scope.now = new Date();
		$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
		
	}, function errorCallback(response) {
	});
}])

.controller('ViewLibangAssistCtrl', [function() {
	
}]);

