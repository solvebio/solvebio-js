'use strict';

var fauxJax = require('faux-jax');
fauxJax.install();
var SolveBio = require('../src/solvebio');

SolveBio.init({
  accessToken: 'fakeToken'
});

fauxJax.on('request', respond);


function respond(request) {
  request.respond(
    200, { // status
      'Content-Type': 'application/json' // headers
    },
    JSON.stringify({
      url: request.requestURL
    }) //body
  );
}

describe('Tests Depositories', function() {
  var depositoryId = 'ClinVar';

  describe('Test retrieve()', function() {
    var depository;

    beforeEach(function(done) {
      depository = SolveBio.Depository(depositoryId).retrieve()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /depositories/:id', function(done) {
      depository.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/depositories/' + depositoryId + '?');
        done();
      });
    });

    it('should fail if no id', function() {
      depository = SolveBio.Depository().retrieve();
      expect(depository).toBeUndefined();
    });
  });

  describe('Test all()', function() {
    var allDepositories;

    beforeEach(function(done) {
      allDepositories = SolveBio.Depository().all()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /depositories/:id/versions', function(done) {
      allDepositories.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/depositories?');
        done();
      });
    });
  });

  describe('Test versions()', function() {
    var versions;

    beforeEach(function(done) {
      versions = SolveBio.Depository(depositoryId).versions()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /depositories/:id/versions', function(done) {
      versions.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/depositories/' + depositoryId + '/versions?');
        done();
      });
    });

    it('should fail if no id', function() {
      versions = SolveBio.Depository().versions();
      expect(versions).toBeUndefined();
    });
  });

});
