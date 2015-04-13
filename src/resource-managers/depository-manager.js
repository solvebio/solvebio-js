'use strict';

var solveBioResourceManager = require('./solvebio-resource-manager');
var solveBioDepository = require('../resources/depository');

/**
 * SolveBio Depository Manager Object
 * @constructor
 */

var solveBioDepositoryManager = function(solveBio) {
  var path = 'depositories';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResourceManager.call(this, solveBio, path);
};

solveBioDepositoryManager.prototype = Object.create(solveBioResourceManager.prototype);

/** @type {function(...[*])} */
solveBioDepositoryManager.prototype.retrieve = function(id, success, error) {
  var depository = new solveBioDepository(this._solveBio, this._path, id);
  depository._retrieve(success, error);
  return depository;
};

module.exports = solveBioDepositoryManager;