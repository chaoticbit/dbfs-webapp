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
            var filedata = data.file;
            var decoded = atob(filedata);
            var filetype = block.data.file_name.split(".")[1];
            var blob = new Blob([ decoded ], { type : 'image/jpg' });
            saveAs(blob, block.data.file_name);
            // var downloadLink = document.createElement('a');
            // downloadLink.setAttribute('href', "data:application/octet-stream;base64," + encodeURIComponent(blob));
            // downloadLink.href = window.URL.createObjectURL(blob);
			// downloadLink.download = block.data.file_name;
            // downloadLink.click();
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

var key = "-----BEGIN RSA PRIVATE KEY-----\
MIICXAIBAAKBgQDcxnn0S+3UTp1chOFPSYczAO9elWzphGSiY8VIIo3E2J+zNkUj\
1bZ0iO/7VPE1LehANt/JNoHTBPH7mQYbAbmvo/GO6HZit2vc0YPeEIt6ZvW/Lo71\
tdN50OxsQJGlX3ztlYAFWLIEWA8bfwtA59P9+dZHMzq6ukhMxPvaRRZAaQIDAQAB\
AoGALCTDXcWQ2FKfxFANfP0Gu3wEYLUgAdEnDhFE8Rd3oVRvGjZPvMqOoN6AnZBu\
amOzfKN8O49ahgcHG3eNcPj3V3fvFdONUpakKohI9/HbidVBrSUcpsTyLfS5CxMB\
VVGBtvGYFRhDOgq5fALoPcUYBcnC7zrRARhXNMynTSyyuwECQQD/enYFYum61s77\
jNvIme5DhfUMbYtOHEAoLxthQKNz8J7Kn71IlGBa3Ue7+jXIAcGjwMdBKdGcvF77\
L+WrgQ+tAkEA3TngQlmurB5AiuDPvqeND4T/c4WFQWgWNAMGPmjpy9cpN/v4WWid\
JwLPJNHjyq/zyKELtgv9QBSUoOzlhKRbLQJAPdts0AkPBooUO5vzazK6GedJWeT8\
IcF9Vz1wp6965AuSpwTeU8B5RAbn43/FndOvCvMWS5TQh96kMLV8KnZpUQJBAJ5R\
jflN3yBUIhKBYorps5yYrIvK0RuG1uTwCSbew/paB6iGDSxHHrhNXVrXTnK+SvOY\
tR3aJKoYUGl+P58WVB0CQF1FhwJ3Nc+OOqZeRwnqcEMQT9MiaUz5Mgd7ZeEepjLM\
/NXhycVyn0N7IF0zgfKy95RvnM9CJIZTwi/YWVxBsIY=\
-----END RSA PRIVATE KEY-----";

