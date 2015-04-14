'use strict';

var solveBioResourceManager = require('./solvebio-resource-manager');
var solveBioDepositoryVersion = require('../resources/depository-version');

/**
 * SolveBio DepositoryVersion Manager Object
 * @constructor
 */

var solveBioDepositoryVersionManager = function(solveBio) {
  var path = 'depository_versions';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResourceManager.call(this, solveBio, path);
};

solveBioDepositoryVersionManager.prototype = Object.create(solveBioResourceManager.prototype);

/** @type {function(...[*])} */
solveBioDepositoryVersionManager.prototype.retrieve = function(id) {
  var depositoryVersion = new solveBioDepositoryVersion(this._solveBio, this._path, id);
  depositoryVersion._retrieve();
  return depositoryVersion;
};

module.exports = solveBioDepositoryVersionManager;