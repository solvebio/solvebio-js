/**
 * Depository Manager module.
 * @module resource-managers/depository-manager
 * @see module:resource-managers/resource-manager
 */
'use strict';

var ResourceManager = require('./resource-manager');

/**
 * Depository Manager Object
 *
 * Class representing an API depository manager.
 * A depository (or data repository) is like a source code repository, but for datasets.
 * Depositories have one or more versions, which in turn contain one or more datasets.
 *
 * @constructor
 * @augments ResourceManager
 * @requires module:resource-managers/resource-manager
 */

var DepositoryManager = function(solveBio, id) {
  var path = 'depositories';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  ResourceManager.call(this, solveBio, path, id);
};

DepositoryManager.prototype = Object.create(ResourceManager.prototype);

/**
 * Retrieve the versions of a depository.
 *
 * @returns {Promise} API response.
 */
DepositoryManager.prototype.versions = function() {
  if(this._id) {
    return this._solveBio.get(this._path + '/' + this._id + '/versions', {});
  }
  else {
    console.error('You need to specify a depository id.');
  }
};

module.exports = DepositoryManager;