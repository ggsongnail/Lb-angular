'use strict';
/**
 * IE9+才能正常跨域访问，以下的版本需要设置Internet安全设置，IE不支持new Header()
 */
angular.module('myApp.viewlibang', ['ngRoute','directives'])
//每次访问连接都会请求ctrl，处理完函数的跳转亦是
.config(['$routeProvider', function($routeProvider) {
  //login
  $routeProvider.when('/viewlibang/adminuser/login', {
	//reloadOnSearch: false,
	templateUrl: 'view/adminuser/login.html',
    controller: 'LoginCtrl'
  });	
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
  
  //人工管理
  $routeProvider.when('/viewlibang/artificialfee/list', {
	  	templateUrl : 'view/artificial/artificialFeeList.html',
	  	controller : 'ArtificialFeeCtrl'
  }).when('/viewlibang/artificialfee/create', {
	  	templateUrl : 'view/artificial/artificialFeeForm.html',
	  	controller : 'ArtificialFeeCtrl'
  }).when('/viewlibang/artificialfee/update/:id', {
	  	templateUrl : 'view/artificial/artificialFeeForm.html',
	  	controller : 'ArtificialFeeCtrl'
  });
  
  //套餐管理
  $routeProvider.when('/viewlibang/materialsets/list', {
	  	templateUrl : 'view/material/materialSetsList.html',
	  	controller : 'MaterialSetsCtrl'
  }).when('/viewlibang/materialsets/create', {
	  	templateUrl : 'view/material/materialSetsForm.html',
	  	controller : 'MaterialSetsCtrl'
  }).when('/viewlibang/materialsets/update/:id', {
	  	templateUrl : 'view/material/materialSetsForm.html',
	  	controller : 'MaterialSetsCtrl'
  });
  
  
  //合同管理
  $routeProvider.when('/viewlibang/orderlb/list', {
	  	templateUrl : 'view/order/orderLb.html',
	  	controller : 'OrderCtrl'
  }).when('/viewlibang/orderlb/create', {
	  	templateUrl : 'view/order/orderLbForm.html',
	  	controller : 'OrderCtrl'
  }).when('/viewlibang/orderlb/update/:id', {
	  	templateUrl : 'view/order/orderLbForm.html',
	  	controller : 'OrderCtrl'
  }).when('/viewlibang/orderlb/done/:id', {
	  	templateUrl : 'view/order/orderDone.html',
	  	controller : 'OrderDoneCtrl'
  }).when('/viewlibang/orderlb/excel', {
	  	templateUrl : 'view/order/orderExcel.html',
	  	controller : 'OrderCtrl'
  }).when('/viewlibang/orderlb/refused/:orderId', {
	  	templateUrl : 'view/order/orderRefused.html',
	  	controller : 'OrderRefuseCtrl'
  })
  
  //主要材料收费单
  $routeProvider.when('/viewlibang/materialmainbill/:orderId/:type', {
    templateUrl: 'view/bill/materialMainBill.html',
    controller: 'MaterialMainBillCtrl'
  });
  //辅助材料收费单
  $routeProvider.when('/viewlibang/materialassistbill/:orderId/:type', {
	templateUrl: 'view/bill/materialAssistBill.html',
	controller: 'MaterialMainBillCtrl'
  });
  
  //人工收费单
  $routeProvider.when('/viewlibang/artificialfeebill/:orderId', {
	templateUrl: 'view/bill/artificialFeeBill.html',
	controller: 'ArtificialFeeBillCtrl'
  });
  
  //套餐收费单
  $routeProvider.when('/viewlibang/kidsetsbill/:orderId/:type', {
	templateUrl: 'view/bill/kidSetsBill.html',
	controller: 'SetsBillCtrl'
  }).when('/viewlibang/artsetsbill/:orderId/:type', {
	templateUrl: 'view/bill/artSetsBill.html',
	controller: 'SetsBillCtrl'
  }).when('/viewlibang/sunsetsbill/:orderId/:type', {
	templateUrl: 'view/bill/sunSetsBill.html',
	controller: 'SetsBillCtrl'
  });
}])

.controller('LoginCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams','$cookies', '$cookieStore','$rootScope', function($scope,$http,$templateCache,NgTableParams,$location,$routeParams,$cookies,$cookieStore, $rootScope) {
	$scope.login = function(user){
		//var headers = new Headers();
		//headers.append('Content-Type','application/x-www-form-urlencoded');
		/*$http.post('http://192.168.1.103:8081/Lb-spring/adminuser/login',user,{
			headers:headers
		})*/
		$http({
	          method: "post",
	          data:user,
	          url: "http://192.168.1.103:8081/Lb-spring/adminuser/login",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(user){
			if(!user.data){
				alert("用户名密码错误");
				return;
			}
			//SessionStatus.isAnonymus = false;
			//SessionStatus.token = "twxskdkdkjfdjkfjdkfdsllfsdkfs";
			$cookies.put('isAnonymus',false);
			$cookies.put('token', "wwwwwssssdfdfsdsgdsgssaggdsaddsgeteert");
			$cookies.put('name',user.data.name);
			$rootScope.name = user.data.name;
			$location.path("/viewlibang/orderlb/list");
			
		},function(){
			//console.log('login fail');
		});
	}
	
	$scope.logout = function(){
		$cookies.remove('isAnonymus');
		$cookies.remove('token');
		$cookies.remove('name');
		$rootScope.name = '';
		$location.path("/viewlibang/adminuser/login")
	}
}])

.controller('DictionaryCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams) {
	var url = $location.url();
	//List页面
	if(url.indexOf('list')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/dictionary/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			////console.log("success");
			$scope.now = new Date();
			$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
			
		}, function errorCallback(response) {
		});
	}
	
	//Ｕpdate页面
	if(url.indexOf('update')>-1){
		//console.log("into update");
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/dictionary/get/'+$routeParams.id+'?callback=JSON_CALLBACK',
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
		//var headers = new Headers();
		//headers.append('Content-Type','application/x-www-form-urlencoded');
		/*$http.post('http://192.168.1.103:8081/Lb-spring/dictionary/save',dictionary,{
			headers:headers
		})*/
		$http({
	          method: "post",
	          data:dictionary,
	          url: "http://192.168.1.103:8081/Lb-spring/dictionary/save",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(data){
			//console.log(data);
			$location.path("/viewlibang/dictionary/list")
		},function(){
			//console.log('create dictionary failed');
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
			url : 'http://192.168.1.103:8081/Lb-spring/dictionaryclassify/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			////console.log("success");
			$scope.now = new Date();
			$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
			
		}, function errorCallback(response) {
		});
	}
	//Create页面
	if(url.indexOf('create')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/dictionary/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.dictionarys = response.data;
		}, function errorCallback(response) {
		});
	}
	//Ｕpdate页面
	if(url.indexOf('update')>-1){
		//console.log("into update");
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/dictionaryclassify/get/'+$routeParams.id+'?callback=JSON_CALLBACK',
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
		//var headers = new Headers();
		//headers.append('Content-Type','application/x-www-form-urlencoded');
		/*$http.post('http://192.168.1.103:8081/Lb-spring/dictionaryclassify/save',dictionaryClassify,{
			headers:headers
		})*/
		$http({
	          method: "post",
	          data:dictionaryClassify,
	          url: "http://192.168.1.103:8081/Lb-spring/dictionaryclassify/save",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(data){
			//console.log(data);
			$location.path("/viewlibang/dictionaryclassify/list")
		},function(){
			//console.log('create dictionaryClassify failed');
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
			url : 'http://192.168.1.103:8081/Lb-spring/materialclassify/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			////console.log("success");
			$scope.now = new Date();
			$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
			
		}, function errorCallback(response) {
		});
	}
	//Create页面
	if(url.indexOf('create')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/dictionaryclassify/list/json/1?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.dictionaryClassifys = response.data;
		}, function errorCallback(response) {
		});
	}
	//Ｕpdate页面
	if(url.indexOf('update')>-1){
		//console.log("into update");
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/materialclassify/get/'+$routeParams.id+'?callback=JSON_CALLBACK',
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
	$scope.submit = function(materialClassify){
		//var headers = new Headers();
		//headers.append('Content-Type','application/x-www-form-urlencoded');
		/*$http.post('http://192.168.1.103:8081/Lb-spring/materialclassify/save',materialClassify,{
			headers:headers
		})*/
		$http({
	          method: "post",
	          data:materialClassify,
	          url: "http://192.168.1.103:8081/Lb-spring/materialclassify/save",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(data){
			//console.log(data);
			$location.path("/viewlibang/materialclassify/list")
		},function(){
			//console.log('create materialclassify failed');
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
			url : 'http://192.168.1.103:8081/Lb-spring/materialproduct/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			////console.log("success");
			$scope.now = new Date();
			$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
			
		}, function errorCallback(response) {
		});
	}
	//Create页面
	if(url.indexOf('create')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/materialclassify/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.materialClassifys = response.data;
		}, function errorCallback(response) {
		});
	}
	//Ｕpdate页面
	if(url.indexOf('update')>-1){
		//console.log("into update");
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/materialproduct/get/'+$routeParams.id+'?callback=JSON_CALLBACK',
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
	$scope.submit = function(materialProduct){
		//var headers = new Headers();
		//headers.append('Content-Type','application/x-www-form-urlencoded');
		/*$http.post('http://192.168.1.103:8081/Lb-spring/materialproduct/save',materialProduct,{
			headers:headers
		})*/
		$http({
	          method: "post",
	          data:materialProduct,
	          url: "http://192.168.1.103:8081/Lb-spring/materialproduct/save",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(data){
			//console.log(data);
			$location.path("/viewlibang/materialproduct/list")
		},function(){
			//console.log('create materialproduct failed');
		});
	}
}])

.controller('ArtificialFeeCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams){
	var url = $location.url();
	var id = $routeParams.id;
	//List页面
	if(url.indexOf('list')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/artificialfee/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			////console.log("success");
			$scope.now = new Date();
			$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
			
		}, function errorCallback(response) {
		});
	}
	//Create页面
	if(url.indexOf('create')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/dictionaryclassify/list/json/4?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.dictionaryClassifys = response.data;
		}, function errorCallback(response) {
		});
	}
	//Ｕpdate页面
	if(url.indexOf('update')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/artificialfee/get/'+id+'?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.artificialFee = response.data.artificialFee;
			$scope.dictionaryClassifys = response.data.dictionaryClassifys;
			//$scope.dictionaryClassify.dictionary.id = response.data.dictionaryClassify.dictionary;
		}, function errorCallback(response) {
		});
	}
	
	$scope.back = function(){
		$location.path("/viewlibang/artificialfee/list")
	}
	$scope.submit = function(artificialFee){
		
		//var headers = new Headers();
		//headers.append('Content-Type','application/x-www-form-urlencoded');
		/*$http.post('http://192.168.1.103:8081/Lb-spring/artificialfee/save',artificialFee,{
			headers:headers
		})*/
		$http({
	          method: "post",
	          data:artificialFee,
	          url: "http://192.168.1.103:8081/Lb-spring/artificialfee/save",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(data){
			$location.path("/viewlibang/artificialfee/list")
		},function(){
			//console.log('create artificialfee failed');
		});
	}
}])

//套餐
.controller('MaterialSetsCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams){
	var url = $location.url();
	var id = $routeParams.id;
	//List页面
	if(url.indexOf('list')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/materialsets/list/json?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			////console.log("success");
			$scope.now = new Date();
			$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
			
		}, function errorCallback(response) {
		});
	}
	//Create页面
	if(url.indexOf('create')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/dictionaryclassify/list/json/5?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.dictionaryClassifys = response.data;
		}, function errorCallback(response) {
		});
	}
	//Ｕpdate页面
	if(url.indexOf('update')>-1){
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/materialsets/get/'+id+'?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.materialSets = response.data.materialSets;
			$scope.dictionaryClassifys = response.data.dictionaryClassifys;
			//$scope.dictionaryClassify.dictionary.id = response.data.dictionaryClassify.dictionary;
		}, function errorCallback(response) {
		});
	}
	
	$scope.back = function(){
		$location.path("/viewlibang/materialsets/list")
	}
	$scope.submit = function(artificialFee){
		
		//var headers = new Headers();
		//headers.append('Content-Type','application/x-www-form-urlencoded');
		/*$http.post('http://192.168.1.103:8081/Lb-spring/artificialfee/save',artificialFee,{
			headers:headers
		})*/
		$http({
	          method: "post",
	          data:artificialFee,
	          url: "http://192.168.1.103:8081/Lb-spring/materialsets/save",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(data){
			$location.path("/viewlibang/materialsets/list")
		},function(){
			//console.log('create artificialfee failed');
		});
	}
}])

.controller('OrderCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams','$window','$timeout',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams,$window,$timeout){
	var url = $location.url();
	$scope.all = false;//表单状态disabled
	$scope.goaway = function(){
		$scope.all = true;
		$timeout(function(){
			$scope.all = false;
		},3000);
	}
	$scope.orderSE = {};
	$scope.payWays = ['支付宝','微信','现金'];
	$scope.orderStatus = ["进行中","完成","拒单"];
	//Ｕpdate页面
	if(url.indexOf('update')>-1){
		//console.log("into update");
		$http({
			method : 'JSONP',
			url : 'http://192.168.1.103:8081/Lb-spring/orderlb/get/'+$routeParams.id+'?callback=JSON_CALLBACK',
			//cache : $templateCache
		}).then(function successCallback(response) {
			$scope.order = response.data;
			
			//$scope.order.signingDate = response.data.signingDate;
		}, function errorCallback(response) {
		});
	}
	$scope.back = function(){
		$location.path("/viewlibang/orderlb/list")
	}
	$scope.submit = function(order){
		$scope.all = true;
		$http({
	          method: "post",
	          data:order,
	          url: "http://192.168.1.103:8081/Lb-spring/orderlb/save",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(data){
			$location.path("/viewlibang/orderlb/list")
		},function(){
			//console.log('update orderlb failed');
		});
	}
	
	$scope.search = function(orderSE){
		$http({
          method: "post",
          data:$scope.orderSE,//Form Data = {"id":1,"value":"hello"}
          url: "http://192.168.1.103:8081/Lb-spring/orderlb/list/json",
          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function successCallback(response) {
			////console.log("success");
			$scope.now = new Date();
			$scope.tableParams = new NgTableParams({count: 15}, { counts: [15, 20, 30],dataset: response.data});
		}, function errorCallback(response) {
		});
	}
	//List页面
	if(url.indexOf('list')>-1){
		$scope.search();
	}
	$scope.refuse = function(id){
		$location.path("/viewlibang/orderlb/refused/"+id);
	}
	$scope.searchExcel1 = function(orderSE){
		//console.log(orderSE);
		$scope.all = true;
		$timeout(function(){
			$scope.all = false;
		},5000);
		var url = "http://192.168.1.103:8081/Lb-spring/orderlb/export/excel?beginDate="+orderSE.signingDate_GTE+"&endDate="+orderSE.signingDate_LTE
		$window.location.href = url;
	}
	$scope.searchExcel2 = function(orderSE){
		$scope.all = true;
		$timeout(function(){
			$scope.all = false;
		},5000);
		var url = "http://192.168.1.103:8081/Lb-spring/orderlb/export/material/excel?beginDate="+orderSE.signingDate_GTE+"&endDate="+orderSE.signingDate_LTE
		$window.location.href = url;
	}
}])
.controller('MaterialMainBillCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams){
	var orderId = $routeParams.orderId;
	var type = $routeParams.type;//0主要　１辅助
	$scope.range = function(n) {
	    return new Array(n);
	};
	$scope.getTotal = function(type){//1乳胶漆类　5艺术漆类　6木漆/水性漆 7辅助材料
		var total = 0;
		if(type!=7){
			for(var l in $scope.left){
				for(var ll in $scope.left[l])
					if($scope.left[l][ll].dictionaryClassifyId==type)
						total += $scope.left[l][ll].count*$scope.left[l][ll].price;
			}
			for(var r in $scope.right){
				for(var rr in $scope.right[r])
					if($scope.right[r][rr].dictionaryClassifyId==type)
						total += $scope.right[r][rr].count*$scope.right[r][rr].price;
			}
		}else{
			for(var l in $scope.left){
				total += $scope.left[l].count*$scope.left[l].price;
			}
			for(var r in $scope.right){
				total += $scope.right[r].count*$scope.right[r].price;
			}
		}
		
		if(type==7)
			$scope.assistTotal = total;
		if(type==1)
			$scope.latexTotal = total;
		if(type==5)
			$scope.artTotal = total;
		if(type==6)
			$scope.woodWaterTotal = total;
		return total;
	};

	$scope.submit = function(product){
		var message = [];
		//var total = $scope.getTotal();
		if(type==0){
			$scope.orderLb.mainPrice = $scope.latexTotal+$scope.artTotal+$scope.woodWaterTotal;//主材费用
			$scope.orderLb.latexPrice = $scope.latexTotal;//乳胶类费用
			$scope.orderLb.artPrice = $scope.artTotal;//艺术漆费用
			$scope.orderLb.woodWaterPrice = $scope.woodWaterTotal;//木性/水性漆费用
			$scope.orderLb.mainPriceReal = $scope.orderLb.latexPriceReal+$scope.orderLb.artPriceReal+$scope.orderLb.woodWaterPriceReal;//主材预算费用
			$scope.orderLb.grossMaterial = $scope.orderLb.mainPriceReal + $scope.orderLb.assistPriceReal;//材料费用
			$scope.orderLb.gross = $scope.orderLb.grossMaterial + $scope.orderLb.grossMan//合同总预算
			
			for(var l in $scope.left){
				for(var ll in $scope.left[l]){
					$scope.left[l][ll].orderId = $scope.orderLb.id;
					message.push($scope.left[l][ll]);
				}
			}
			for(var r in $scope.right){
				for(var rr in $scope.right[r]){
					$scope.right[r][rr].orderId = $scope.orderLb.id;
					message.push($scope.right[r][rr]);
				}
			}
		}
		if(type==1){
			$scope.orderLb.assistPrice = $scope.assistTotal;//辅材费用;　辅材预算费用已绑定到表单无需在此处理assistPriceReal
			$scope.orderLb.grossMaterial = $scope.orderLb.mainPriceReal + $scope.orderLb.assistPriceReal;//材料费用
			$scope.orderLb.gross = $scope.orderLb.grossMaterial + $scope.orderLb.grossMan//合同总预算
			
			for(var l in $scope.left){
				$scope.left[l].orderId = $scope.orderLb.id;
				message.push($scope.left[l]);
			}
			for(var r in $scope.right){
				$scope.right[r].orderId = $scope.orderLb.id;
				message.push($scope.right[r]);
			}
		}
		
		console.log(angular.toJson(message));
		//var headers = new Headers();
		//headers.append('Content-Type','application/x-www-form-urlencoded');
		/*$http.post('http://192.168.1.103:8081/Lb-spring/orderproduct/bill/save',message,{
			headers:headers
		})*/
		$http({
	          method: "post",
	          data:$scope.orderLb,
	          url: "http://192.168.1.103:8081/Lb-spring/orderlb/save",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(data){
			//console.log(data);
			$http({
		          method: "post",
		          data:message,
		          url: "http://192.168.1.103:8081/Lb-spring/orderproduct/bill/save",
		          headers: { "Content-Type": "application/json;text/plain" }
			}).then(function(data){
				$location.path('/viewlibang/orderlb/list');
			},function(){
				//console.log('create orderproduct failed');
			});
		},function(){
			//console.log('create orderproduct failed');
		});
	};
	$http({
		method : 'JSONP',
		url : 'http://192.168.1.103:8081/Lb-spring/materialproduct/listformainbill/json/'+orderId+'/'+type+'?callback=JSON_CALLBACK',
		//cache : $templateCache
	}).then(function successCallback(response) {
		$scope.left = response.data.left;
		$scope.right = response.data.right;
		$scope.orderLb = response.data.orderLb;
	}, function errorCallback(response) {
	});
}])

.controller('ArtificialFeeBillCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams){
	var orderId = $routeParams.orderId;
	$scope.getTotal = function(){
		var total = 0;
		var totalReal = 0;
		for(var l in $scope.latexs){
			total += $scope.latexs[l].count*$scope.latexs[l].price>$scope.latexs[l].lowFee?$scope.latexs[l].count*$scope.latexs[l].price:$scope.latexs[l].lowFee*($scope.latexs[l].count>0?1:0);
			totalReal += $scope.latexs[l].totalReal;
		}
		for(var l in $scope.woods){
			total += $scope.woods[l].count*$scope.woods[l].price>$scope.woods[l].lowFee?$scope.woods[l].count*$scope.woods[l].price:$scope.woods[l].lowFee*($scope.woods[l].count>0?1:0);
			totalReal += $scope.woods[l].totalReal;
		}
		for(var l in $scope.waters){
			total += $scope.waters[l].count*$scope.waters[l].price>$scope.waters[l].lowFee?$scope.waters[l].count*$scope.waters[l].price:$scope.waters[l].lowFee*($scope.waters[l].count>0?1:0);
			totalReal += $scope.waters[l].totalReal;
		}
		for(var l in $scope.basics){
			total += $scope.basics[l].count*$scope.basics[l].price>$scope.basics[l].lowFee?$scope.basics[l].count*$scope.basics[l].price:$scope.basics[l].lowFee*($scope.basics[l].count>0?1:0);
			totalReal += $scope.basics[l].totalReal;
		}
		for(var l in $scope.others){
			total += $scope.others[l].count*$scope.others[l].price>$scope.others[l].lowFee?$scope.others[l].count*$scope.others[l].price:$scope.others[l].lowFee*($scope.others[l].count>0?1:0);
			totalReal += $scope.others[l].totalReal;
		}
		
		$scope.totalPrice = total;
		$scope.totalRealPrice = totalReal;
			
		return total;
	};

	$scope.submit = function(){
		var message = [];
		$scope.orderLb.artificialPrice = $scope.totalPrice;//人工费用
		$scope.orderLb.artificialPriceReal = $scope.totalRealPrice;//人工费用预算与下面相同防止以后有用到此字段
		$scope.orderLb.grossMan = $scope.totalRealPrice;//人工费用预算
		$scope.orderLb.gross = $scope.orderLb.grossMaterial + $scope.orderLb.grossMan//合同总预算
		for(var l in $scope.latexs){
			$scope.latexs[l].orderId = $scope.orderLb.id;
			message.push($scope.latexs[l]);
		}
		for(var l in $scope.woods){
			$scope.woods[l].orderId = $scope.orderLb.id;
			message.push($scope.woods[l]);
		}
		for(var l in $scope.waters){
			$scope.waters[l].orderId = $scope.orderLb.id;
			message.push($scope.waters[l]);
		}
		for(var l in $scope.basics){
			$scope.basics[l].orderId = $scope.orderLb.id;
			message.push($scope.basics[l]);
		}
		for(var l in $scope.others){
			$scope.others[l].orderId = $scope.orderLb.id;
			message.push($scope.others[l]);
		}
		
		$http({
	          method: "post",
	          data:$scope.orderLb,
	          url: "http://192.168.1.103:8081/Lb-spring/orderlb/save",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(data){
			$http({
		          method: "post",
		          data:message,
		          url: "http://192.168.1.103:8081/Lb-spring/orderartificialfee/bill/save",
		          headers: { "Content-Type": "application/json;text/plain" }
			}).then(function(data){
				$location.path('/viewlibang/orderlb/list');
			},function(){
			});
		},function(){
		});
		
	};
	$http({
		method : 'JSONP',
		url : 'http://192.168.1.103:8081/Lb-spring/artificialfee/listforbill/json/'+orderId+'?callback=JSON_CALLBACK',
		//cache : $templateCache
	}).then(function successCallback(response) {
		$scope.latexs = response.data.artiMap.latexs;
		$scope.woods = response.data.artiMap.woods;
		$scope.waters = response.data.artiMap.waters;
		$scope.basics = response.data.artiMap.basics;
		$scope.others = response.data.artiMap.others;
		$scope.orderLb = response.data.orderLb;
	}, function errorCallback(response) {
		
	});
}])

.controller('SetsBillCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams){
	var orderId = $routeParams.orderId;
	var type = $routeParams.type;
	$http({
		method : 'JSONP',
		url : 'http://192.168.1.103:8081/Lb-spring/materialsets/setsbill/json/'+orderId+'/'+type+'?callback=JSON_CALLBACK',
		//cache : $templateCache
	}).then(function successCallback(response) {
		$scope.orderSetss = response.data.orderSetss;
		$scope.orderLb = response.data.orderLb;
	}, function errorCallback(response) {
	});
}])

.controller('OrderDoneCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams','$cookies', '$cookieStore',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams,$cookies,$cookieStore){
	var orderId = $routeParams.id;
	if(!$cookieStore.get("products")){
		
	}
	$scope.materialIndex = 0;
	$scope.manIndex = 0;
	$scope.show = function(){
		console.log($scope.confMaterial);
	}
	$scope.materialDel = function(index){
		if(typeof($scope.confMaterial[index].difCount)=='undefined'){//空值直接删除index以及数组内容
			$scope.materialIndex = $scope.materialIndex-1;
			$scope.confMaterial.splice(index,1);
		}else{//有值的将其归零并隐藏，这样做是为了将后台过来的数据在放到后台归零
			$scope.confMaterial[index].difCount = 0;
			$scope.confMaterial[index].difTotal = 0;
			angular.element("#materialDel"+index).parent().parent().addClass("hidden");
		}
	}
	$scope.manDel = function(index){
		if(typeof($scope.confMan[index].difCount) == 'undefined'){
			$scope.manIndex = $scope.manIndex-1;
			$scope.confMan.splice(index,1);
		}else{
			$scope.confMan[index].difCount = 0;
			$scope.confMan[index].difTotal = 0;
			angular.element("#manDel"+index).parent().parent().addClass("hidden");
		}
	}
	$scope.selectMaterialChange = function (data,index) {  
		$scope.confMaterial[index] = data;
	} 
	
	$scope.selectManChange = function (data,index) {  
		$scope.confMan[index] = data
	}
	
	//获取材料总变更金额
	$scope.getChangeMaterialDifFee = function(){
		var total = 0;
		for(var m in $scope.confMaterial){
			//total += $scope.confMaterial[m].price*$scope.confMaterial[m].count;
			total += !$scope.confMaterial[m].difTotal?0:$scope.confMaterial[m].difTotal;
		}
		return total;
	}
	
	//获取人工总变更金额
	$scope.getChangeManDifFee = function(){
		var total = 0;
		for(var m in $scope.confMan){
			total += !$scope.confMan[m].difTotal?0:$scope.confMan[m].difTotal;
		}
		return total;
	}
	
	$http({
		method : 'JSONP',
		url : 'http://192.168.1.103:8081/Lb-spring/orderlb/finalorder/json/'+orderId+'?callback=JSON_CALLBACK',
		//cache : $templateCache
	}).then(function successCallback(response) {
		//历史决算的数据以及最后提交用这个
		$scope.confMaterial = response.data.materialsHis; 
		$scope.confMan = response.data.mansHis;
		
		//下拉框专用数据
		$scope.materials = response.data.materials;
		$scope.mans = response.data.mans;
		
		//新增数据框位置标记
		$scope.materialIndex = $scope.confMaterial.length;
		$scope.manIndex = $scope.confMan.length;
		
		$scope.orderLb = response.data.orderLb;
	}, function errorCallback(response) {
	});
	
	$scope.submit = function(){
		//材料费变更合计--difMaterialTotal
		$scope.orderLb.difMaterialTotal = $scope.getChangeMaterialDifFee();
		//材料费预算金额--mainPriceReal+assistPriceReal=grossMaterial|
		
		//材料费决算金额--mainPriceReal+assistPriceReal+difMaterialTotal=grossMaterialFinal
		$scope.orderLb.grossMaterialFinal = $scope.orderLb.grossMaterial + $scope.orderLb.difMaterialTotal;
		
		//人工费变更合计--difManTotal
		$scope.orderLb.difManTotal = $scope.getChangeManDifFee();
		//人工费预算金额--artificialPriceReal=grossMan|
		//人工费决算金额--artificialPriceReal+difManTotal=grossManFinal
		$scope.orderLb.grossManFinal = $scope.orderLb.grossMan + $scope.orderLb.difManTotal;
		
		//合同预算总额--mainPriceReal+assistPriceReal+artificialPriceReal=gross|
		//合同决算总额--mainPriceReal+assistPriceReal+artificialPriceReal+difMaterialTotal+difManTotal=grossFinal
		$scope.orderLb.grossFinal = $scope.orderLb.grossMaterialFinal + $scope.orderLb.grossManFinal;
		
		//console.log($scope.orderLb.grossManFinal);
		//console.log($scope.orderLb.grossMaterialFinal);
		//console.log($scope.orderLb.grossFinal);
		$http({
	          method: "post",
	          data:$scope.orderLb,
	          url: "http://192.168.1.103:8081/Lb-spring/orderlb/save",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(data){
			$http({
		          method: "post",
		          data:$scope.confMaterial,
		          url: "http://192.168.1.103:8081/Lb-spring/orderlb/final/material/save",
		          headers: { "Content-Type": "application/json;text/plain" }
			}).then(function(data){
				$http({
			          method: "post",
			          data:$scope.confMan,
			          url: "http://192.168.1.103:8081/Lb-spring/orderlb/final/man/save",
			          headers: { "Content-Type": "application/json;text/plain" }
				}).then(function(data){
					$location.path('/viewlibang/orderlb/list');
				},function(){
					//console.log('create orderartificial failed');
				});
			},function(){
				//console.log('create orderartificial failed');
			});
		},function(){
			//console.log('create orderartificial failed');
		});
	}
}])

.controller('OrderRefuseCtrl', ['$scope','$http','$templateCache','NgTableParams','$location',
	'$routeParams','$cookies', '$cookieStore',function($scope,$http,$templateCache,NgTableParams,$location,$routeParams,$cookies,$cookieStore){
	var orderId = $routeParams.orderId;
	$scope.add = function(){
		$scope.refuses[$scope.index] = {};
		$scope.index += 1;
	}
	$http({
		method : 'JSONP',
		url : 'http://192.168.1.103:8081/Lb-spring/orderrefuse/refuses/json/'+orderId+'?callback=JSON_CALLBACK',
		//cache : $templateCache
	}).then(function successCallback(response) {
		$scope.index = response.data.orderRefuses.length;
		$scope.refuses = response.data.orderRefuses;
		$scope.orderLb = response.data.orderLb;
	}, function errorCallback(response) {
	});
	
	$scope.sumbit = function(){
		for(var i in $scope.refuses){
			$scope.refuses[i].orderLb = $scope.orderLb;
		}
		$http({
	          method: "post",
	          data: $scope.refuses,
	          url: "http://192.168.1.103:8081/Lb-spring/orderrefuse/save/refuses",
	          headers: { "Content-Type": "application/json;text/plain" }
		}).then(function(data){
			
		},function(){
			
		});
	}
}]);


