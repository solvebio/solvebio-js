'use strict';

var SolveBio = require('./init')();

describe('Tests Dataset Fields', function() {
  var fieldId = 'ClinVar/3.1.0-2015-01-13/Variants/gene_symbol_hgnc';

  describe('Test retrieve()', function() {
    var field;

    beforeEach(function(done) {
      field = SolveBio.DatasetField(fieldId).retrieve()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /fields/:id', function(done) {
      field.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/dataset_fields/' + fieldId + '?');
        done();
      });
    });

    it('should fail if no id', function() {
      field = SolveBio.DatasetField().retrieve();
      expect(field).toBeUndefined();
    });
  });

  describe('Test all()', function() {
    var allfields;

    beforeEach(function(done) {
      allfields = SolveBio.DatasetField().all()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /dataset_fields', function(done) {
      allfields.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/dataset_fields?');
        done();
      });
    });
  });

  describe('Test facets()', function() {
    var facets;

    beforeEach(function(done) {
      facets = SolveBio.DatasetField(fieldId).facets()
        .then(function(data){
          done();
          return data;
        });
    });

    it('should query /dataset_fields/:id/facets', function(done) {
      facets.then(function(data) {
        expect(data.url).toEqual('https://api.solvebio.com/v1/dataset_fields/' + fieldId + '/facets?');
        done();
      });
    });

    it('should fail if no id', function() {
      facets = SolveBio.DatasetField().facets();
      expect(facets).toBeUndefined();
    });
  });

});