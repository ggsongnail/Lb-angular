angular.module("directives",[]).directive("datetimepicker",function(){
return {
    restrict: "EA",
    require : "ngModel",
    scope : {
    	id:'@',
    	ngModel:'='
    }, 
    template : "<input id='{{id}}' type='text' class='form-control' ng-model='ngModel'>",
    link: function (scope, element, attrs, ctrl) {
        var unregister = scope.$watch(function(){
            element.on('change', function() {
                scope.$apply(function() {
                	if($("#"+attrs.id).val()!='')
                		ctrl.$setViewValue($("#"+attrs.id).val());
                });
            });
            element.on('click',function(){
                $("#"+attrs.id).datetimepicker({
                    format : attrs.format || 'Y/m/d h:i',
                    onClose : function(){
                        element.change();
                    }
                });
            });
            element.click();
            return ctrl.$modelValue;
        }, initialize);
        function initialize(value){
            ctrl.$setViewValue(value);
            unregister();
        }
    }
}
}).directive('ensureUnique', ['$http','$timeout','$window',function($http,$timeout,$window) {
    return {
        restrict:"A",
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelController){
        	 element.bind('blur', function (e) {
        		 if (!ngModelController || !element.val()) return;
                 var keyProperty = attrs.name;
                 var id = !attrs.orderid?0:attrs.orderid;
                 
                 var currentValue = element.val();
                 console.log(keyProperty+"::"+id+"::"+currentValue);
                 
                 $http({
                     method: 'get',
                     url: 'http://192.168.1.103:8081/Lb-spring/orderlb/validity/'+keyProperty+'/'+currentValue+'/'+id//根据换成自己的url
                     /*params:{
                         "orderName":n
                     }*/
                 }).success(function(data) {
                     ngModelController.$setValidity(attrs.name+'unique', data); //data.isUnique这个取决于你返回的，其实就是返回一个是否正确的字段，具体的这块可以自己修改根据自己的项目
                 }).error(function(data) {
                     //ngModelController.$setValidity(attrs.name+'unique', false);
                 });
        	 });
                 
                 
        	/*
            scope.$watch(attrs.ngModel, function(n) {
                if (!n) return;
                $timeout.cancel($window.timer);
                $window.timer = $timeout(function(){
                    $http({
                        method: 'get',
                        url: 'http://192.168.1.103:8081/Lb-spring/orderlb/validity/'+attrs.name+'/'+n//根据换成自己的url
                        params:{
                            "orderName":n
                        }
                    }).success(function(data) {
                        ngModelController.$setValidity(attrs.name+'unique', data); //data.isUnique这个取决于你返回的，其实就是返回一个是否正确的字段，具体的这块可以自己修改根据自己的项目
                    }).error(function(data) {
                        ngModelController.$setValidity(attrs.name+'unique', false);
                    });
                },500);
            });*/
        }
    };
}]).directive("inputDynamicMaterial", function($compile){
	return{
        link: function(scope, element, attrs){
            element.on("click", function() {
            	var index = attrs.value;
            	
            	var template = '<tr><td><button del-elment>删除</button></td><td><select ng-change="selectMaterialChange(confMaterial['+index+'].name,'+index+')" class="form-control" ng-model="confMaterial['+index+'].name" '+
        					   		'ng-options="product.name for product in products track by product.id"> '+
        					   '</select></td>'+
    	    				   '<td><input name="test" class="form-control" type="text" ng-trim="false" ng-model="confMaterial['+index+'].standard"/></td>'+
    	    		           '<td><input name="test" class="form-control" type="number" ng-trim="false" disabled ng-model="confMaterial['+index+'].price"/></td>'+
    	    		           '<td><input name="test" class="form-control" type="number" ng-trim="false" ng-model="confMaterial['+index+'].count"/></td>'+
    	    		           '<td>{{confMaterial['+index+'].price*confMaterial['+index+'].count}}</td></tr>';
            	attrs.value = parseInt(attrs.value) + 1;
                scope.$apply(function() {
                    var content = $compile(template)(scope);
                    element.parent().parent().parent().append(content);
                })
            });
        }
    }
}).directive("inputDynamicMan", function($compile){
	return{
        link: function(scope, element, attrs){
            element.on("click", function() {
            	var index = attrs.value;
            	
            	var template = '<tr><td><button del-elment>删除</button></td><td><select ng-change="selectManChange(confMan['+index+'].name,'+index+')" class="form-control" ng-model="confMan['+index+'].name" '+
        					   		'ng-options="man.name for man in mans track by man.id"> '+
        					   '</select></td>'+
    	    				   '<td><input name="test" class="form-control" type="text" ng-trim="false" ng-model="confMan['+index+'].standard"/></td>'+
    	    		           '<td><input name="test" class="form-control" type="number" ng-trim="false" disabled ng-model="confMan['+index+'].price"/></td>'+
    	    		           '<td><input name="test" class="form-control" type="number" ng-trim="false" ng-model="confMan['+index+'].count"/></td>'+
    	    		           '<td>{{confMan['+index+'].price*confMan['+index+'].count}}</td></tr>';
            	attrs.value = parseInt(attrs.value) + 1;
                scope.$apply(function() {
                    var content = $compile(template)(scope);
                    element.parent().parent().parent().append(content);
                })
            });
        }
    }
}).directive("delElment", function(){
	return{
        link: function(scope, element, attrs){
        	element.on("click", function() {
        		element.parent().parent().remove();
        	});
        }
    }
});

