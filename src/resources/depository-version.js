'use strict';

var solveBioResource = require('./solvebio-resource');

/**
 * SolveBio DepositoryVersion Object
 * @constructor
 */

var solveBioDepositoryVersion = function(solveBio, path, id) {
  path = path + '/' + id;

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResource.call(this, solveBio, path);
};

solveBioDepositoryVersion.prototype = Object.create(solveBioResource.prototype);

solveBioDepositoryVersion.prototype.datasets = function(success, error) {
  return this._solveBio._get(this._path + '/datasets', {}, success, error);
};

module.exports = solveBioDepositoryVersion;