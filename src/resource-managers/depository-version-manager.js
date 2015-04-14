'use strict';

var console = require('../utils/console');
var solveBioResourceManager = require('./solvebio-resource-manager');

/**
 * SolveBio DepositoryVersion Manager Object
 * @constructor
 */

var solveBioDepositoryVersionManager = function(solveBio, id) {
  var path = 'depository_versions';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResourceManager.call(this, solveBio, path, id);
};

solveBioDepositoryVersionManager.prototype = Object.create(solveBioResourceManager.prototype);

solveBioDepositoryVersionManager.prototype.datasets = function() {
  if(this._id) {
    return this._solveBio.get(this._path + '/' + this._id + '/datasets', {});
  }
  else {
    console.error('You need to specify an id.');
  }
};

solveBioDepositoryVersionManager.prototype.changelog = function() {
  if(this._id) {
    return this._solveBio.get(this._path + '/' + this._id + '/changelog', {});
  }
  else {
    console.error('You need to specify an id.');
  }
};

module.exports = solveBioDepositoryVersionManager;