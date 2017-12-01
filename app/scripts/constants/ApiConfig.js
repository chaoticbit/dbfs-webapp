'use strict';

angular.module('dbfsWebappApp').factory('ApiConfig', function() {
    var API_URL = 'http://localhost:4000/api/v1';

    return {
        API_URL: API_URL
    };
});
