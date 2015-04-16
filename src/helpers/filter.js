'use strict';

var _ = require('../utils/underscore');

/**
 * SolveBio Filter Object
 *
 * Class representing a query filter.
 * The Javascript client allows you to create filters using the Filter object and
 * combine them using the chaining functions and(), or(), not() representing the boolean operators.
 *
 * Example:
 * var filter1 = SolveBio.Filter({gene_symbol: 'BRCA1'});
 * var filter2 = SolveBio.Filter({gene_symbol: 'BRCA1'});
 * var combinedFilter = filter1.or(filter2);
 *
 * @constructors
 */

var Filter = function(filters) {
  var fields = _.keys(filters);

  /** @public */
  if(fields.length === 1) {
    this.filters = [fields[0], filters[fields[0]]];
  }
  else {
    this.filters = {
      and: _.map(fields, function(field) {
        return [field, filters[field]];
      })
    };
  }
};

/**
 * Boolean operator 'and'
 *
 * @param {Filter} filter The second operand.
 * @returns {Filter} Combined filter
 */
Filter.prototype.and = function(filter) {
  this.filters = {
    and: [this.filters, filter.filters]
  };

  return this;
};

/**
 * Boolean operator 'or'
 *
 * @param {Filter} filter The second operand.
 * @returns {Filter} Combined filter
 */
Filter.prototype.or = function(filter) {
  this.filters = {
    or: [this.filters, filter.filters]
  };

  return this;
};

/**
 * Boolean operator 'not'
 *
 * @returns {Filter} Inverted filter
 */
Filter.prototype.not = function() {
  this.filters = {
    not: this.filters
  };

  return this;
};

module.exports = Filter;