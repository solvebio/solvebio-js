/**
 * Annotator Manager module.
 * @module resource-managers/annotator-manager
 * @see module:resource-managers/base-manager
 */
'use strict';

var BaseManager = require('./base-manager');

/**
 * Annotator Manager Object
 *
 * Class representing an Annotator manager.
 * Annotation is the process of linking information together.
 * On SolveBio, expression formulas are used to compute values,
 * which can be linked within records with an Annotator.
 *
 * @constructor
 * @augments BaseManager
 * @requires module:resource-managers/base-manager
 */

var AnnotatorManager = function(solveBio, fields, includeErrors) {
  var path = '/v1/annotate';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  BaseManager.call(this, solveBio, path);

  this.fields = fields;
  this.includeErrors = !!includeErrors;
};

AnnotatorManager.prototype = Object.create(BaseManager.prototype);

/**
 * Annotate a list of records.
 *
 * @param {Object} records List of records to annotate.
 * @returns {Promise} Annotate API response.
 */
AnnotatorManager.prototype.annotate = function(records) {
  return this._solveBio.post(this._path, {
    fields: this.fields,
    include_errors: this.includeErrors,
    records: records
  });
};

module.exports = AnnotatorManager;
