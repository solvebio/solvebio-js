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

solveBioDatasetManager.prototype.query = function() {
  if(this._id) {
    return this._solveBio._get(this._path + '/' + this._id + '/data', {});
  }
  else {
    console.error('You need to specify an id.');
  }
};

solveBioDatasetManager.prototype.fields = function() {
  if(this._id) {
    return this._solveBio._get(this._path + '/' + this._id + '/fields', {});
  }
  else {
    console.error('You need to specify an id.');
  }
};

module.exports = solveBioDatasetManager;