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
            url: ApiConfig.API_URL + ''
        });
    };

    this.getBlockChainMetaData = function() {
        return $http({
            method: 'GET',
            url: ApiConfig.API_URL + ''
        });
    };

    this.uploadFile = function(file) {
        var fd = new FormData();
        fd.append('file', file);

        return $http({
            method: 'POST',
            withCredentials: true,
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined }
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
            url: ApiConfig.API_URL + '/' + page,
        });
    };

    this.getSingleBlockInfo = function(hash) {
        return $http({
            method: 'GET',
            url: ApiConfig.API_URL + '/' + hash,
        });
    };
});
