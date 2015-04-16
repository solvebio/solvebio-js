'use strict';

var solveBioResourceManager = require('./solvebio-resource-manager');
var Filter = require('../helpers/filter');

/**
 * SolveBio Datasets Manager Object
 *
 * Class representing an API Datasets manager.
 * Datasets contain queryable data in the form of documents with fields and values.
 * Datasets are identified by unique full names.
 * For example, the 3.0.0-2014-12-05 version of the ClinVar Variants dataset can be retrieved with ClinVar/3.0.0-2014-12-05/Variants.
 *
 * @constructor
 * @augments solveBioResourceManager
 */

var solveBioDatasetManager = function(solveBio, fullName) {
  var path = 'datasets';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResourceManager.call(this, solveBio, path, fullName);
};

solveBioDatasetManager.prototype = Object.create(solveBioResourceManager.prototype);

/**
 * Query a dataset.
 * The 'options' object can contain the following parameters:
 *
 * @param {Object} options The query options.
 * @param {Number} [options.limit=100] options.limit Limit the number of results returned per request (max 10000).
 * @param {Number} [options.offset=0] options.offset The desired offset within the set of results.
 * @param {String} [options.genome_build='GRCH37'] options.genome_build The genome build (genomic datasets only).
 * @param {Object|Filter} options.filters Query filters.
 * @param {Array} options.fields Limit the fields returned in the results.
 * @returns {Promise} API response.
 */
solveBioDatasetManager.prototype.query = function(options) {
  if(this._id) {
    options = options || {};
    if(options.filters instanceof Filter) {
      options.filters = [options.filters.filters];
    }
    return this._solveBio.post(this._path + '/' + this._id + '/data', {
      limit: options.limit,
      offset: options.offset,
      genome_build: options.genome_build,
      filters: options.filters || undefined,
      fields: options.fields
    });
  }
  else {
    console.error('You need to specify a full name.');
  }
};

/**
 * List fields in a dataset.
 * @returns {Promise} API response.
 */
solveBioDatasetManager.prototype.fields = function() {
  if(this._id) {
    return this._solveBio.get(this._path + '/' + this._id + '/fields', {});
  }
  else {
    console.error('You need to specify a full name.');
  }
};

/**
 * Filter a dataset.
 *
 * @param {SolveBio.Filter} filter Query filter.
 * @returns {Promise} API response.
 */
solveBioDatasetManager.prototype.filter = function(filter) {
  if(this._id) {
    return this.query({
      filters: filter
    });
  }
  else {
    console.error('You need to specify a full name.');
  }
};

module.exports = solveBioDatasetManager;