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

  it('should request 2-digit next page', function(done) {
    SolveBio.Dataset().all()
      .then(function(data) {
        return data.next();
      })
      .then(function(dataNext) {
        expect(dataNext.url).toEqual('https://api.solvebio.com/v1/datasets?page=13');
        done();
      });
  });

  it('should request 2-digit prev page', function(done) {
    SolveBio.Dataset().all()
      .then(function(data) {
        return data.prev();
      }).then(function(dataPrev) {
        expect(dataPrev.url).toEqual('https://api.solvebio.com/v1/datasets?page=11');
        done();
      });
  });
});