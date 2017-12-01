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

});
