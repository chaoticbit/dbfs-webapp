'use strict';

describe('Controller: BlocksCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfsWebappApp'));

  var BlocksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlocksCtrl = $controller('BlocksCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BlocksCtrl.awesomeThings.length).toBe(3);
  });
});
