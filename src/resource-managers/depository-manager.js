'use strict';

var solveBioResourceManager = require('./solvebio-resource-manager');

/**
 * SolveBio Depository Manager Object
 *
 * Class representing an API depository manager.
 * A depository (or data repository) is like a source code repository, but for datasets.
 * Depositories have one or more versions, which in turn contain one or more datasets.
 *
 * @constructor
 * @augments solveBioResourceManager
 */

var solveBioDepositoryManager = function(solveBio, id) {
  var path = 'depositories';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResourceManager.call(this, solveBio, path, id);
};

solveBioDepositoryManager.prototype = Object.create(solveBioResourceManager.prototype);

/**
 * Retrieve the versions of a depository.
 *
 * @returns {Promise} API response.
 */
solveBioDepositoryManager.prototype.versions = function() {
  if(this._id) {
    return this._solveBio.get(this._path + '/' + this._id + '/versions', {});
  }
  else {
    console.error('You need to specify an id.');
  }
};

module.exports = solveBioDepositoryManager;