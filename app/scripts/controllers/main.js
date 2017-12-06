'use strict';

/**
 * @ngdoc function
 * @name dbfsWebappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dbfsWebappApp
 */
angular.module('dbfsWebappApp').controller('MainCtrl', function ($scope, $route, $timeout, $location, ApiConfig, BlockApiService) {
    $scope.totalBlockchains = 30;
    $scope.totalFileUploads = 20;
    $scope.totalNodes = 3;
    $scope.counterDuration = 1;
    $scope.isKeyPresent = false;
    $scope.blocklist = [];
    $scope.metaData = {};
    $scope.privateKey;
    $scope.memo;

    BlockApiService.getBlocks().then(function(data) {
        $scope.blocklist = data.entries;
        $scope.metaData.totalPages = data.total_pages;
        $scope.metaData.totalEntries = data.total_entries;
        $scope.metaData.currentPage = data.page_number;
        console.log($scope.blocklist);
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

    $scope.saveUploadedFile = function(files) {
        $scope.selectedFile = files[0];
        $scope.selectedFileName = $scope.selectedFile.name;
        console.log($scope.selectedFileName);
        $scope.$apply();
    };

    $scope.uploadFile = function() {
        DBFS.File.read($scope.selectedFile, function(file) {
            var blockWithFile = DBFS.Block.fileCreate($scope.blocklist[0], file, $scope.privateKey);
            BlockApiService.uploadFile(blockWithFile).then(function(data) {
                $('#fileUploadModal').modal('hide');
                console.log(data);
            }, function(error) {
                console.log(error);
            }).catch(function(res) {
                console.log(res);
            }).finally(function() {
              $timeout(function() {$route.reload();}, 1200);
            });
        })
    };

    $('.load-more-btn').click(function() {
        var nextPage = $scope.metaData.currentPage + 1;
        BlockApiService.loadMoreBlocks(nextPage).then(function(data) {
            $scope.metaData.currentPage = data.page_number
            $scope.blocklist = $scope.blocklist.concat(data.entries);
            console.log($scope.blocklist);
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
    });

});
