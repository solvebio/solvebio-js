/**
 * Dataset Manager module.
 * @module resource-managers/dataset-manager
 * @see module:resource-managers/resource-manager
 */
'use strict';

var _ = require('../utils/underscore');
var ResourceManager = require('./resource-manager');
var Filter = require('../helpers/filter');

/**
 * Dataset Manager Object
 *
 * Class representing an API Datasets manager.
 * Datasets contain queryable data in the form of documents with fields and values.
 * Datasets are identified by unique full names.
 * For example, the 3.0.0-2014-12-05 version of the ClinVar Variants dataset can be retrieved with ClinVar/3.0.0-2014-12-05/Variants.
 *
 * @constructor
 * @augments ResourceManager
 * @requires module:resource-managers/resource-manager
 */

var DatasetManager = function(solveBio, fullName) {
  var path = '/v1/datasets';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  ResourceManager.call(this, solveBio, path, fullName);
};

DatasetManager.prototype = Object.create(ResourceManager.prototype);

/**
 * Query a dataset.
 * The 'options' object can contain the following parameters:
 *
 * @param {Object} options The query options.
 * @param {Number} [options.limit=100] Limit the number of results returned per request (max 10000).
 * @param {Number} [options.offset=0] The desired offset within the set of results.
 * @param {String} [options.genome_build='GRCh37'] The genome build (genomic datasets only).
 * @param {Object|Filter} [options.filters=undefined] Query filters.
 * @param {Array} [options.fields=undefined] The fields that should be returned in the results.
 * @returns {Promise} API response.
 */
DatasetManager.prototype.query = function(options) {
  if(this._id) {
    var defaultOptions = {
      limit: 100,
      offset: 0
    };
    options = _.defaults(options || {}, defaultOptions);
    if(options.filters instanceof Filter) {
      options.filters = [options.filters.filters];
    }
    return this._solveBio.post(this._path + '/' + this._id + '/data', {
      limit: options.limit,
      offset: options.offset,
      genome_build: options.genome_build,
      query: options.query,
      filters: options.filters,
      fields: options.fields
    });
  }
  else {
    console.error('You need to specify a dataset id or full name.');
  }
};

/**
 * List fields in a dataset.
 * @returns {Promise} API response.
 */
DatasetManager.prototype.fields = function() {
  if(this._id) {
    return this._solveBio.get(this._path + '/' + this._id + '/fields', {});
  }
  else {
    console.error('You need to specify a dataset id or full name.');
  }
};

/**
 * Filter a dataset.
 *
 * @param {Filter} filter Query filter.
 * @returns {Promise} API response.
 */
DatasetManager.prototype.filter = function(filter) {
  if(this._id) {
    return this.query({
      filters: filter
    });
  }
  else {
    console.error('You need to specify a dataset id or full name.');
  }
};

module.exports = DatasetManager;
