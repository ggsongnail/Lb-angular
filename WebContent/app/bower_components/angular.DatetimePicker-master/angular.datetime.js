angular.module("directives",[]).directive("datetimepicker",function(){return {
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
});
