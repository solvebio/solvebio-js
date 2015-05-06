'use strict';

var SolveBio = require('./init')();

describe('Tests Depository Versions', function() {
  var depositoryVersionId = 'ClinVar/2.0.0-1';

  describe('Test retrieve()', function() {
    var depositoryVersion;

    beforeEach(function(done) {
      depositoryVersion = SolveBio.DepositoryVersion(depositoryVersionId).retrieve()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /depository_versions/:id', function(done) {
      depositoryVersion.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/depository_versions/' + depositoryVersionId + '?');
        done();
      });
    });

    it('should fail if no id', function() {
      depositoryVersion = SolveBio.DepositoryVersion().retrieve();
      expect(depositoryVersion).toBeUndefined();
    });
  });

  describe('Test all()', function() {
    var allDepositoryVersions;

    beforeEach(function(done) {
      allDepositoryVersions = SolveBio.DepositoryVersion().all()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /depository_versions', function(done) {
      allDepositoryVersions.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/depository_versions?');
        done();
      });
    });
  });

  describe('Test datasets()', function() {
    var datasets;

    beforeEach(function(done) {
      datasets = SolveBio.DepositoryVersion(depositoryVersionId).datasets()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /depository_versions/:id/datasets', function(done) {
      datasets.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/depository_versions/' + depositoryVersionId + '/datasets?');
        done();
      });
    });

    it('should fail if no id', function() {
      datasets = SolveBio.DepositoryVersion().datasets();
      expect(datasets).toBeUndefined();
    });
  });

  describe('Test changelog()', function() {
    var changelog;

    beforeEach(function(done) {
      changelog = SolveBio.DepositoryVersion(depositoryVersionId).changelog()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /depository_versions/:id/changelog', function(done) {
      changelog.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/depository_versions/' + depositoryVersionId + '/changelog?');
        done();
      });
    });

    it('should fail if no id', function() {
      changelog = SolveBio.DepositoryVersion().changelog();
      expect(changelog).toBeUndefined();
    });
  });

});
