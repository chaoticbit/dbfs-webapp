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

    $scope.blocklist = [
        {
            filename: 'sample.mp4',
            hash: '0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553',
            timestamp: '321232132423'
        },{
            filename: 'myfile.mp4',
            hash: '0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553',
            timestamp: '321232132423'
        },{
            filename: 'Blizzard.mp4',
            hash: '0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553',
            timestamp: '321232132423'
        }
    ];

    $(document).ready(function() {
        $('.node-block').hover(function() {
            $(this).find('table').addClass('active-defocus');
            $(this).find('.node-block-defocus-panel').show();
        }, function() {
            $(this).find('table').removeClass('active-defocus');
            $(this).find('.node-block-defocus-panel').hide();
        });
    });

    $scope.downloadBlock = function() {
        if(!$scope.isKeyPresent) {
            $('#enterKeyModal').modal('toggle');
        }
    };

    $('#enterKeyModal').on('shown.bs.modal', function () {
        $(this).find('input').focus();
    });

});
