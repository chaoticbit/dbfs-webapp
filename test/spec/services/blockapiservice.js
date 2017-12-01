'use strict';

describe('Service: BlockApiService', function () {

  // load the service's module
  beforeEach(module('dbfsWebappApp'));

  // instantiate service
  var BlockApiService;
  beforeEach(inject(function (_BlockApiService_) {
    BlockApiService = _BlockApiService_;
  }));

  it('should do something', function () {
    expect(!!BlockApiService).toBe(true);
  });

});
