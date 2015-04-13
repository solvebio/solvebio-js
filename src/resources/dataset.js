'use strict';

var solveBioResource = require('./solvebio-resource');

/**
 * SolveBio Dataset Object
 * @constructor
 */

var solveBioDataset = function(solveBio, path, id) {
  path = path + '/' + id;

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResource.call(this, solveBio, path);
};

solveBioDataset.prototype = Object.create(solveBioResource.prototype);

solveBioDataset.prototype.query = function(success, error) {
  return this._solveBio._post(this._path + '/data', {}, success, error);
};

module.exports = solveBioDataset;