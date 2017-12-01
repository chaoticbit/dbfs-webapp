'use strict';

/**
 * @ngdoc overview
 * @name dbfsWebappApp
 * @description
 * # dbfsWebappApp
 *
 * Main module of the application.
 */
var app = angular
  .module('dbfsWebappApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'countTo'
  ]).constant('_', _);

  app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/blocks', {
        templateUrl: 'views/blocks.html',
        controller: 'BlocksCtrl',
        controllerAs: 'blocks'
      })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.interceptors.push(function($q, $rootScope) {
         return {

             'request': function(config) {
                 return config;
             },

             'requestError': function(rejection) {
                 return $q.reject(rejection);
             },

             'response': function(response) {
                 /* if it is not an internal angular request then unwrap the response data  */
                 if(_.isObject(response.data)) {
                     return response.data;
                 }
                 else {
                     // forward internal angular response
                     return response;
                 }
             },

             'responseError': function(rejection) {
                 if(rejection.status == -1){
                     console.log('generic internet/server error');
                     return $q.reject(rejection);
                 }
                 else{ // if custom API error
                    return rejection;
                 }
             }
         };
     });
  });
