'use strict';

/**
 * @ngdoc function
 * @name dbfsWebappApp.controller:BlocksCtrl
 * @description
 * # BlocksCtrl
 * Controller of the dbfsWebappApp
 */
angular.module('dbfsWebappApp').controller('BlocksCtrl', function ($scope, $routeParams, ApiConfig, BlockApiService) {
    $scope.blockHash = $routeParams.hash;
    $scope.blockInfo = {};

    BlockApiService.getSingleBlockInfo($scope.blockHash).then(function(data) {
        $scope.blockInfo = data;
        console.log($scope.blockInfo);
    }, function(error) {

    }).catch(function(res) {

    }).finally(function() {

    });
});
