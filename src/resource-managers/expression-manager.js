/**
 * Expression Manager module.
 * @module resource-managers/expression-manager
 * @see module:resource-managers/resource-manager
 */
'use strict';

var ResourceManager = require('./resource-manager');

/**
 * Expression Manager Object
 *
 * Class representing an Expression manager.
 * Expressions are formulas that execute on the SolveBio API. They return a
 * single value or list of values with a specific data type.
 *
 * @constructor
 * @augments ResourceManager
 * @requires module:resource-managers/resource-manager
 */

var ExpressionManager = function(solveBio, expression, dataType, isList) {
  var path = 'evaluate';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  ResourceManager.call(this, solveBio, path, null);

  this.expression = expression;
  this.dataType = dataType;
  this.isList = isList;
};

ExpressionManager.prototype = Object.create(ResourceManager.prototype);

/**
 * Evaluate an expression.
 *
 * @param {Object} data (optional) Variables referenced by the expression.
 * @returns {Promise} Expression API response.
 */
ExpressionManager.prototype.evaluate = function(data) {
  console.log(this._solveBio);
  return this._solveBio.post(this._path, {
    expression: this.expression,
    data_type: this.dataType,
    is_list: this.isList,
    data: data
  });
};

module.exports = ExpressionManager;
