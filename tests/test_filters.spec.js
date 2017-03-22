'use strict';

var SolveBio = require('../src/solvebio');

describe('Tests filters', function() {
  beforeEach(function() {
    SolveBio.init({
      debug: true,
      accessToken: 'fakeToken'
    });
  });

  it('should create a single filter', function() {
    var filter = SolveBio.Filter({
      rcv_accession: 'RCV000058095'
    });
    expect(filter.filters).toEqual(['rcv_accession', 'RCV000058095']);
  });

  it('should create an and filter', function() {
    var filter = SolveBio.Filter({
      rcv_accession: 'RCV000058095',
      clinical_significance: 'Pathogenic'
    });
    expect(filter.filters).toEqual({
      and: [
        ['rcv_accession', 'RCV000058095'],
        ['clinical_significance', 'Pathogenic']
      ]
    });
  });

  it('should combine filters with all()', function() {
    var filter1 = SolveBio.Filter({
      gene_symbol: 'BRCA1'
    });
    var filter2 = SolveBio.Filter({
      clinical_significance: 'Pathogenic'
    });
    expect(filter1.and(filter2).filters).toEqual({
      and: [
        ['gene_symbol', 'BRCA1'],
        ['clinical_significance', 'Pathogenic']
      ]
    });
  });

  it('should combine filters with or()', function() {
    var filter1 = SolveBio.Filter({
      gene_symbol: 'BRCA1'
    });
    var filter2 = SolveBio.Filter({
      gene_symbol: 'BRCA2'
    });
    expect(filter1.or(filter2).filters).toEqual({
      or: [
        ['gene_symbol', 'BRCA1'],
        ['gene_symbol', 'BRCA2']
      ]
    });
  });

  it('should support nested filters', function() {
    var filter1 = SolveBio.Filter({
      gene_symbol: 'BRCA1'
    });
    var filter2 = SolveBio.Filter({
      gene_symbol: 'BRCA2'
    });
    var filter3 = SolveBio.Filter({
      clinical_significance: 'Pathogenic'
    });
    expect(filter1.or(filter2.and(filter3)).filters).toEqual({
      or: [
        ['gene_symbol', 'BRCA1'],
        {
          and: [
            ['gene_symbol', 'BRCA2'],
            ['clinical_significance', 'Pathogenic']
          ]
        }
      ]
    });
  });

  it('should inverse a filter', function() {
    var filter = SolveBio.Filter({
      gene_symbol: 'BRCA1'
    });
    expect(filter.not().filters).toEqual({
      not: ['gene_symbol', 'BRCA1']
    });
  });
});
