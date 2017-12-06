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
    $scope.nodeslist = [];
    $scope.privateKey = window.localStorage.getItem(ApiConfig.PRIVATE_KEY_NAME) || '';
    $scope.memo;

    var loadTime = 5000,
        errorCount = 0,
        loadPromise;

    BlockApiService.getBlocks().then(function(data) {
        var response = data.recent;
        $scope.blocklist = response.entries;
        $scope.metaData.totalPages = response.total_pages;
        $scope.metaData.totalEntries = response.total_entries;
        $scope.metaData.currentPage = response.page_number;
        $scope.nodeslist = data.nodes;
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

    $('#fileUploadModal').on('shown.bs.modal', function () {
        $(this).find('textarea').focus();
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
        window.localStorage.setItem(ApiConfig.PRIVATE_KEY_NAME, $scope.privateKey);
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

    var getData = function() {
        BlockApiService.getLiveNodeStatus().then(function(data) {
            $scope.nodeslist = data.nodes;
            errorCount = 0;
            nextLoad();
        }, function(error) {

        }).catch(function(res) {

        }).finally(function() {

        });
    };

    var cancelNextLoad = function() {
        $timeout.cancel(loadPromise);
    };

    var nextLoad = function(mill) {
        mill = mill || loadTime;

        cancelNextLoad();
        loadPromise = $timeout(getData, mill);
    };

    getData();

    $scope.$on('$destroy', function() {
        cancelNextLoad();
    });

});
