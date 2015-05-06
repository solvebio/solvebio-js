'use strict';

var SolveBio = require('./init')();

describe('Tests Datasets', function() {
  var datasetId = 'ClinVar/2.0.0-1/Variants';

  describe('Test retrieve()', function() {
    var dataset;

    beforeEach(function(done) {
      dataset = SolveBio.Dataset(datasetId).retrieve()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /datasets/:id', function(done) {
      dataset.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/datasets/' + datasetId + '?');
        done();
      });
    });

    it('should fail if no id', function() {
      dataset = SolveBio.Dataset().retrieve();
      expect(dataset).toBeUndefined();
    });
  });

  describe('Test all()', function() {
    var alldatasets;

    beforeEach(function(done) {
      alldatasets = SolveBio.Dataset().all()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /datasets', function(done) {
      alldatasets.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/datasets?');
        done();
      });
    });
  });

  describe('Test query()', function() {
    var results;

    beforeEach(function(done) {
      results = SolveBio.Dataset(datasetId).query()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /datasets/:id/data', function(done) {
      results.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/datasets/' + datasetId + '/data');
        done();
      });
    });

    it('should fail if no id', function() {
      results = SolveBio.Dataset().query();
      expect(results).toBeUndefined();
    });
  });

  describe('Test fields()', function() {
    var fields;

    beforeEach(function(done) {
      fields = SolveBio.Dataset(datasetId).fields()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /datasets/:id/fields', function(done) {
      fields.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/datasets/' + datasetId + '/fields?');
        done();
      });
    });

    it('should fail if no id', function() {
      fields = SolveBio.Dataset().fields();
      expect(fields).toBeUndefined();
    });
  });

});
