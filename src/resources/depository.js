'use strict';

var solveBioResource = require('./solvebio-resource');

/**
 * SolveBio Depository Object
 * @constructor
 */

var solveBioDepository = function(solveBio, path, id) {
  path = path + '/' + id;

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResource.call(this, solveBio, path);
};

solveBioDepository.prototype = Object.create(solveBioResource.prototype);

module.exports = solveBioDepository;