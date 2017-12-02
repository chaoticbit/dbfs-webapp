'use strict';

/**
 * @ngdoc function
 * @name dbfsWebappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dbfsWebappApp
 */
angular.module('dbfsWebappApp').controller('MainCtrl', function ($scope, $location, ApiConfig, BlockApiService) {
    $scope.totalBlockchains = 30;
    $scope.totalFileUploads = 20;
    $scope.totalNodes = 3;
    $scope.counterDuration = 1;
    $scope.isKeyPresent = false;
    $scope.blocklist = [];
    $scope.metaData = {};

    BlockApiService.getBlocks().then(function(data) {
        $scope.blocklist = data.entries;
        $scope.metaData.totalPages = data.total_pages;
        $scope.metaData.totalEntries = data.total_entries;
        $scope.metaData.currentPage = data.page_number;
    }, function(error) {

    }).catch(function(res) {

    }).finally(function() {
        $(document).ready(function() {
            $('.node-block').hover(function() {
                $(this).find('table').addClass('active-defocus');
                $(this).find('.node-block-defocus-panel').show();
            }, function() {
                $(this).find('table').removeClass('active-defocus');
                $(this).find('.node-block-defocus-panel').hide();
            });
        });
    });

    $scope.downloadBlock = function(block) {
        // if(!$scope.isKeyPresent) {
        //     $('#enterKeyModal').modal('toggle');
        // }
        BlockApiService.downloadBlock(block.hash).then(function(data) {
          DBFS.File.downloadEncoded(block.data.file_name, data.file);
        }, function(error) {

        }).catch(function(res) {

        }).finally(function() {
        });
    };

    $('#enterKeyModal').on('shown.bs.modal', function () {
        $(this).find('input').focus();
    });

    $('.toggle-file-upload').click(function() {
        $('.file-upload').click();
    });

    $scope.uploadFile = function(files) {
        var file_name = files[0].name;
    };

});
