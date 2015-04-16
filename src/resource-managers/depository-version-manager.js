'use strict';

var console = require('../utils/console');
var solveBioResourceManager = require('./solvebio-resource-manager');

/**
 * SolveBio DepositoryVersions Manager Object
 *
 * Class representing an API Depository Versions manager.
 * Depositories and datasets may be updated periodically.
 * Depository versions are a mechanism to keep track of changes within a depository.
 * Depository versions are named according to the Semantic Versioning guidelines.
 * Example version names include: 1.0.0 and 0.0.1-2014-01-01.
 *
 * @constructor
 * @augments solveBioResourceManager
 */

var solveBioDepositoryVersionManager = function(solveBio, id) {
  var path = 'depository_versions';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResourceManager.call(this, solveBio, path, id);
};

solveBioDepositoryVersionManager.prototype = Object.create(solveBioResourceManager.prototype);

/**
 * List datasets in a depository version.
 *
 * @returns {Promise} API response.
 */
solveBioDepositoryVersionManager.prototype.datasets = function() {
  if(this._id) {
    return this._solveBio.get(this._path + '/' + this._id + '/datasets', {});
  }
  else {
    console.error('You need to specify an id.');
  }
};

/**
 * Retrieves the changelog of a specific depository_version by its full name or ID.
 * The response will show which attributes were removed, added or changed.
 *
 * @returns {Promise} API response.
 */
solveBioDepositoryVersionManager.prototype.changelog = function() {
  if(this._id) {
    return this._solveBio.get(this._path + '/' + this._id + '/changelog', {});
  }
  else {
    console.error('You need to specify an id.');
  }
};

module.exports = solveBioDepositoryVersionManager;