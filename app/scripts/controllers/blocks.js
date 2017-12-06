'use strict';

/**
 * @ngdoc function
 * @name dbfsWebappApp.controller:BlocksCtrl
 * @description
 * # BlocksCtrl
 * Controller of the dbfsWebappApp
 */
angular.module('dbfsWebappApp').controller('BlocksCtrl', function ($scope, $routeParams, $window, ApiConfig, BlockApiService) {
    $scope.blockHash = $routeParams.hash;
    $scope.blockInfo = {};
    $scope.privateKey = window.localStorage.getItem(ApiConfig.PRIVATE_KEY_NAME) || '';

    BlockApiService.getSingleBlockInfo($scope.blockHash).then(function(data) {
        $scope.blockInfo = data;
        window.block = data;
        console.log($scope.blockInfo);
    }, function(error) {

    }).catch(function(res) {

    }).finally(function() {

    });

    $('#enterKeyModal').on('shown.bs.modal', function () {
        $(this).find('textarea').focus();
    });

    $scope.openEnterKeyModal = function() {
        $('#enterKeyModal').modal('toggle');
    };

    $scope.downloadBlock = function() {
        window.localStorage.setItem(ApiConfig.PRIVATE_KEY_NAME, $scope.privateKey);

      if (DBFS.Block.isOwner(block, $scope.privateKey)) {
        BlockApiService.downloadBlock(block.hash).then(function(data) {
          DBFS.File.downloadEncoded(block.data.file_name, data.file);
        }, function(error) {

        }).catch(function(res) {

        }).finally(function() {
            $('#enterKeyModal').modal('hide');
        });
      } else {
        alert("Invalid Key");
      }
    };
});
