'use strict';

/**
 * @ngdoc service
 * @name dbfsWebappApp.BlockApiService
 * @description
 * # BlockApiService
 * Service in the dbfsWebappApp.
 */
angular.module('dbfsWebappApp').service('BlockApiService', function ($http, ApiConfig) {

    this.getBlocks = function() {
        return $http({
            method: 'GET',
            url: ApiConfig.API_URL
        });
    };

    this.getSingleBlockInfo = function(hash) {
        return $http({
            method: 'GET',
            url: ApiConfig.API_URL + '/blocks/' + hash,
        });
    };

    this.uploadFile = function(blockWithfile) {
        return $http({
            method: 'POST',
            url: ApiConfig.API_URL + '/blocks',
            data: blockWithfile,
            headers: {'Content-Type': 'application/json'}
        });
    };

    this.searchBlocks = function(key) {
        return $http({
            method: 'POST',
            url: ApiConfig.API_URL + '',
            data: {'key': key},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
    };

    this.loadMoreBlocks = function(page) {
        return $http({
            method: 'GET',
            url: ApiConfig.API_URL + '/blocks?page=' + page,
        });
    };

    this.downloadBlock = function(hash) {
        return $http({
            method: 'GET',
            url: ApiConfig.API_URL + '/blocks/' + hash + '/file',
        });
    };

    this.getLiveNodeStatus = function() {
        return $http({
            method: 'GET',
            url: ApiConfig.API_URL + '/nodes'
        });
    };
});
