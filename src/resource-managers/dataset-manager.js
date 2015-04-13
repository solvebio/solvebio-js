'use strict';

var solveBioResourceManager = require('./solvebio-resource-manager');
var solveBioDataset = require('../resources/dataset');

/**
 * SolveBio Dataset Manager Object
 * @constructor
 */

var solveBioDatasetManager = function(solveBio) {
  var path = 'datasets';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResourceManager.call(this, solveBio, path);
};

solveBioDatasetManager.prototype = Object.create(solveBioResourceManager.prototype);

/** @type {function(...[*])} */
solveBioDatasetManager.prototype.retrieve = function(id, success, error) {
  var dataset = new solveBioDataset(this._solveBio, this._path, id);
  dataset._retrieve(success, error);
  return dataset;
};

module.exports = solveBioDatasetManager;