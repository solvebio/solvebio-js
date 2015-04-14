'use strict';

var solveBioResourceManager = require('./solvebio-resource-manager');

/**
 * SolveBio Depository Manager Object
 * @constructor
 */

var solveBioDepositoryManager = function(solveBio, id) {
  var path = 'depositories';

  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  solveBioResourceManager.call(this, solveBio, path, id);
};

solveBioDepositoryManager.prototype = Object.create(solveBioResourceManager.prototype);

module.exports = solveBioDepositoryManager;