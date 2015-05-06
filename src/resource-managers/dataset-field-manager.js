/**
 * Dataset Field Manager module.
 * @module resource-managers/dataset-manager
 * @see module:resource-managers/resource-manager
 */
'use strict';

var ResourceManager = require('./resource-manager');

/**
 * Dataset Field Manager Object
 *
 * SolveBio datasets have a different fields (also known as schemas).
 * All dataset fields can be used in query filters.
 * The Dataset field resources provide users with documentation about each field.
 *
 * @constructor
 * @augments ResourceManager
 * @requires module:resource-managers/resource-manager
 */

var DatasetFieldManager = function(solveBio, id) {
  var path = 'dataset_fields';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  ResourceManager.call(this, solveBio, path, id);
};

DatasetFieldManager.prototype = Object.create(ResourceManager.prototype);

/**
 * Facets are all the possible values of a given field. This endpoint retrieves the facets of a given field.
 * @returns {Promise} API response.
 */
DatasetFieldManager.prototype.facets = function() {
  if(this._id) {
    return this._solveBio.get(this._path + '/' + this._id + '/facets', {});
  }
  else {
    console.error('You need to specify an id.');
  }
};

module.exports = DatasetFieldManager;