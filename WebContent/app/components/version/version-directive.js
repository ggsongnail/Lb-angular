'use strict';

angular.module('myApp.version.version-directive', [])
//<span app-version></span>
.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}]);
