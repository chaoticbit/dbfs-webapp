'use strict';

/**
 * @ngdoc function
 * @name dbfsWebappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dbfsWebappApp
 */
angular.module('dbfsWebappApp').controller('MainCtrl', function ($scope) {
    $scope.totalBlockchains = 30;
    $scope.totalFileUploads = 20;
    $scope.totalNodes = 3;
    $scope.counterDuration = 1;

    $scope.isKeyPresent = false;

    $('.node-block').on('mouseover', function() {
        $(this).find('table').addClass('active-defocus');
        $(this).find('.node-block-defocus-panel').show();
    });

    $('.node-block').on('mouseout', function() {
        $(this).find('table').removeClass('active-defocus');
        $(this).find('.node-block-defocus-panel').hide();
    });

    $('.node-block-defocus-panel').on('click', function() {
        if(!$scope.isKeyPresent) {
            $('#enterKeyModal').modal('toggle');
        }
    });

    $('#enterKeyModal').on('shown.bs.modal', function () {
        $(this).find('input').focus();
    });

});
