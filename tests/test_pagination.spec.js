'use strict';

var SolveBio = require('./init')();

describe('Test Pagination', function() {
  it('should have next and prev functions', function(done) {
    SolveBio.Dataset().all()
      .then(function(data) {
        expect(typeof data.next).toEqual('function');
        expect(typeof data.prev).toEqual('function');
        done();
      });
  });
});