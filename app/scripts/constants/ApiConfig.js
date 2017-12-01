'use strict';

angular.module('dbfsWebappApp').factory('ApiConfig', function() {
    var API_URL = 'http://localhost/someapi';

    return {
        API_URL: API_URL
    };
});
