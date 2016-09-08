/*
 * SolveBio JS Library v0.0.1
 *
 * Copyright 2015, Solve, Inc. All Rights Reserved
 * https://www.solvebio.com/
 *
 * Includes portions of Underscore.js
 * http://documentcloud.github.com/underscore/
 * (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
 * Released under the MIT License.
 */

/*
 Will export window.SolveBio
 */

/*
 CODING STYLE GUIDE:

 this.x == public function
 this._x == private - only use within the class
 this.__x == internal - only use within this file

 Globals should be all caps
 */
/**
 * SolveBio module.
 * @module solvebio
 * @see module:resource-managers/depository-manager
 * @see module:resource-managers/depository-version-manager
 * @see module:resource-managers/dataset-manager
 * @see module:resource-managers/dataset-field-manager
 * @see module:helpers/filter
 */
'use strict';

var console = require('./utils/console');
var config = require('./config');
var _ = require('./utils/underscore');
var Promise = require('./utils/promise');

// NodeJS wrapper for the built-in http client to emulate the browser XMLHttpRequest object.
var req = require;
var _XMLHttpRequest = typeof window === 'undefined' || !window ? req('xmlhttprequest').XMLHttpRequest : XMLHttpRequest;


var DepositoryManager = require('./resource-managers/depository-manager'),
  DepositoryVersionManager = require('./resource-managers/depository-version-manager'),
  DatasetManager = require('./resource-managers/dataset-manager'),
  DatasetFieldManager = require('./resource-managers/dataset-field-manager'),
  Filter = require('./helpers/filter');

/**
 * SolveBio Global Object
 *
 * Contains the API resources managers (Depository, DepositoryVersion and Dataset) and the Filter constructor.
 * This object performs every AJAX call as well using the get(), post(), delete(), update() methods.
 *
 * SolveBio Javascript library doesn't use callbacks at all but returns Promises.
 * 'solvebio.js' stand-alone build does not include any Promise polyfill.
 * Just be sure to include a Promise API (we support Q, jQuery, AngularJS, or a Promise polyfill) before SolveBio is loaded,
 * and it will use your Promise API.
 * Otherwise you should use the 'solvebio-promises.js' build which already includes the BlueBird Promise library.
 *
 * @constructor
 */

var SolveBio = function() {
  /** @public */
  this.VERSION = config.VERSION;

  /** @private */
  this._config = config;

  /**
   * @param {String} id The depository ID or full name.
   * @returns {DepositoryManager} Instance of DepositoryManager.
   */
  this.Depository = function(id) {
    return new DepositoryManager(this, id);
  };

  /**
   * @param {String} id The depository version ID or full name.
   * @returns {DepositoryVersionManager} Instance of DepositoryVersionManager.
   */
  this.DepositoryVersion = function(id) {
    return new DepositoryVersionManager(this, id);
  };

  /**
   * @param {String} id The dataset ID or full name.
   * @returns {DatasetManager} Instance of DatasetManager.
   */
  this.Dataset = function(id) {
    return new DatasetManager(this, id);
  };

  /**
   * @param {String} id The dataset Field ID or name.
   * @returns {DatasetFieldManager} Instance of DatasetFieldManager.
   */
  this.DatasetField = function(id) {
    return new DatasetFieldManager(this, id);
  };

  /**
   * @param {Object} filters Query filters object.
   * @returns {Filter} Instance of Filter.
   */
  this.Filter = function(filters) {
    return new Filter(filters);
  };

  return this;
};

// Serializes data to a query string
var serialize = function(obj) {
  var str = [];
  for (var p in obj) {
    var k = p,
      v = obj[p];
    str.push(typeof v === 'object' ?
      serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
  }
  return str.join('&');
};

/**
 * Initialize the SolveBio global object.
 *
 * @param {Object} userConfig User SolveBio configuration.
 * @param {String} userConfig.accessToken User access token.
 * @param {Boolean} [userConfig.debug=false] Activate/Deactivate console logs and warnings.
 */
SolveBio.prototype.init = function(userConfig) {
  this._config._accessToken = userConfig.accessToken;
  config.DEBUG = !!userConfig.debug;
};

var buildURL = function(url, params) {
  return url + (url.indexOf('?') > 0 ? '&' : '?') + serialize(params);
};

/**
 * Performs an AJAX call and returns a Promise.
 *
 * @param {String} path URL API path.
 * @returns {Promise} API response.
 */
SolveBio.prototype.$http = function(path){
  var self = this;
  var core = {
    // AJAX call
    ajax: function(method, url, data, args) {
      if(self._config._accessToken) {
        // Returns a promise
        return new Promise(function(resolve, reject) {

          // Instantiate XMLHttpRequest
          // IE6 and below are not supported...
          var xhr = new _XMLHttpRequest();
          url = '' + self._config.apiHost + '/' + url.replace(/^\/?/, '');

          if (method === 'GET') {
            // serialize the data into the query parameters
            url = buildURL(url, data);
            data = null;
          }
          else {
            // JSONify the data into the request body
            data = JSON.stringify(data, null, 4);
          }

          console.log('Sending ' + method + ' request to ' + url);
          xhr.open(method, url, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('Authorization', 'Bearer ' + self._config._accessToken);
          xhr.send(data);

          xhr.onload = function () {
            if(this.status === 200){
              // Use 'resolve' if this.status equals 200
              var response = JSON.parse(this.responseText);

              // Pagination support
              if(response.links) {
                if(response.links.next) {
                  response.next = function() {
                    var nextPage = response.links.next.match(/^.*page=(\d+)$/)[1];
                    var newData = _.assign(JSON.parse(data) || {}, {page: nextPage});
                    return core.ajax(method, path, newData, args);
                  };
                }

                if(response.links.prev) {
                  response.prev = function() {
                    var prevPage = response.links.prev.match(/^.*page=(\d+)$/)[1];
                    var newData = _.assign(JSON.parse(data) || {}, {page: prevPage});
                    return core.ajax(method, path, newData, args);
                  };
                }
              }
              else if(response.offset) {
                // Dataset query responses don't have links.next/prev
                response.next = function() {
                  var nextOffset = response.offset;
                  var newData = _.assign(JSON.parse(data) || {}, {offset: nextOffset});
                  return core.ajax(method, path, newData, args);
                };
              }

              resolve(response);
            }
            else{
              // Use 'reject' if this.status is different than 200
              reject(JSON.parse(this.responseText));
            }
          };

          xhr.onerror = function () {
            reject(this.statusText);
          };
        });
      }
      else {
        console.error('You must initialize the SolveBio instance with a valid Token: SolveBio.init(/* configObject */)');
      }
    }
  };

  // Pattern adapter
  return {
    get: function(data, args) {
      return core.ajax('GET', path, data, args);
    },
    post: function(data, args) {
      return core.ajax('POST', path, data, args);
    },
    put: function(data, args) {
      return core.ajax('PUT', path, data, args);
    },
    delete: function(data, args) {
      return core.ajax('DELETE', path, data, args);
    }
  };
};

/* REST shortcut methods */

var restShortcut = function(method) {
  SolveBio.prototype[method.toLowerCase()] = function() {
    return SolveBio.prototype.$http.apply(this, [arguments[0]])[method.toLowerCase()].apply(this, [].slice.call(arguments, 1));
  };
};

var restMethods = ['GET', 'PUT', 'POST', 'DELETE'];
_.forEach(restMethods, function(method) {
  restShortcut(method);
});

// Export the SolveBio object for **Node.js**,
// and add `SolveBio` as a global object.
global.SolveBio = module.exports = new SolveBio();