/**
 * Annotator Manager module.
 * @module resource-managers/annotator-manager
 * @see module:resource-managers/resource-manager
 */
'use strict';

var ResourceManager = require('./resource-manager');

/**
 * Annotator Manager Object
 *
 * Class representing an Annotator manager.
 * Annotation is the process of linking information together.
 * On SolveBio, expression formulas are used to compute values,
 * which can be linked within records with an Annotator.
 *
 * @constructor
 * @augments ResourceManager
 * @requires module:resource-managers/resource-manager
 */

var AnnotatorManager = function(solveBio, fields, include_errors) {
  var path = '/v1/annotate';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  ResourceManager.call(this, solveBio, path, null);

  this.fields = fields;
  this.include_errors = !!include_errors;
};

AnnotatorManager.prototype = Object.create(ResourceManager.prototype);

/**
 * Annotate a list of records.
 *
 * @param {Object} records List of records to annotate.
 * @returns {Promise} Annotate API response.
 */
AnnotatorManager.prototype.annotate = function(records) {
  return this._solveBio.post(this._path, {
    fields: this.fields,
    include_errors: this.include_errors,
    records: records
  });
};

module.exports = AnnotatorManager;
