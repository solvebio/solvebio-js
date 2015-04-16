'use strict';

var _ = require('../utils/underscore');

/**
 * Filter Object
 * @constructor
 */

var Filter = function(filters) {
  var fields = _.keys(filters);

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

Filter.prototype.and = function(filter) {
  this.filters = {
    and: [this.filters, filter.filters]
  };

  return this;
};

Filter.prototype.or = function(filter) {
  this.filters = {
    or: [this.filters, filter.filters]
  };

  return this;
};

Filter.prototype.not = function() {
  this.filters = {
    not: this.filters
  };

  return this;
};

module.exports = Filter;