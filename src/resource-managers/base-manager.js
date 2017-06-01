/**
 * Resource Manager module.
 * @module resource-managers/resource-manager
 */
'use strict';

/**
 * Base Manager Object
 *
 * Class representing a SolveBio API object manager.
 *
 * @constructor
 */

var BaseManager = function(solveBio, path) {
    /** @private */
    this._solveBio = solveBio;

    /** @private */
    this._path = path;
};

module.exports = BaseManager;