'use strict';

angular.module('dbfsWebappApp').factory('ApiConfig', function() {
    var API_URL = 'http://localhost:4000/api/v1';
    var PRIVATE_KEY_NAME = 'dbfs.privatekey.value';

    return {
        API_URL: API_URL,
        PRIVATE_KEY_NAME: PRIVATE_KEY_NAME
    };
});
