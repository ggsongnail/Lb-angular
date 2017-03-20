'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngCookies',	
  'ngRoute',
  'ngTable',
  'ngCookies',
  'myApp.session',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.viewlibang'
]).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/viewlibang/orderlb/list'});
}]).run(function($rootScope) {
    $rootScope.test = new Date();
    $rootScope.name = 'admin';
});
