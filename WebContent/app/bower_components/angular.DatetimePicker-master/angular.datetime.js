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
        }
    };
}]).directive("inputDynamicMaterial", ['$timeout','$compile',function($timeout,$compile){
	return{
        link: function(scope, element, attrs,ctrl){
        	/*scope.$apply(function() {
                var content = $compile(template)(scope);
                element.parent().parent().parent().append(content);
            })*/
        	//这么简单的套路，我却用了半天来想。。
        	element.on("click",function(){
    			$timeout(function(){ 
    				scope.confMaterial[scope.materialIndex] = {};
    				scope.materialIndex += 1;
    			});
        		scope.$apply();//$timeout实现apply()功能
        	})
        }
    }
}]).directive("inputDynamicMan", ['$timeout','$compile',function($timeout,$compile){
	return{
        link: function(scope, element, attrs){
        	element.on("click",function(){
        		$timeout(function(){ 
    				scope.confMan[scope.manIndex] = {};
    				scope.manIndex += 1;
    			});
        	});
        }
    }
}]);

