'use strict';

var solveBioResourceManager = require('./solvebio-resource-manager');

/**
 * SolveBio Dataset Manager Object
 * @constructor
 */

var solveBioDatasetManager = function(solveBio, id) {
  var path = 'datasets';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResourceManager.call(this, solveBio, path, id);
};

solveBioDatasetManager.prototype = Object.create(solveBioResourceManager.prototype);

solveBioDatasetManager.prototype.query = function(options) {
  if(this._id) {
    return this._solveBio.post(this._path + '/' + this._id + '/data', {
      genome_build: options.genome_build,
      filters: options.filters,
      fields: options.fields
    });
  }
  else {
    console.error('You need to specify an id.');
  }
};

solveBioDatasetManager.prototype.fields = function() {
  if(this._id) {
    return this._solveBio.get(this._path + '/' + this._id + '/fields', {});
  }
  else {
    console.error('You need to specify an id.');
  }
};

module.exports = solveBioDatasetManager;