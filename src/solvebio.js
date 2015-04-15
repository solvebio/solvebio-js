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
'use strict';

var console = require('./utils/console');
var config = require('./config');
var _ = require('./utils/underscore');
var Promise = require('./utils/promise');

var solveBioDepositoryManager = require('./resource-managers/depository-manager'),
  solveBioDepositoryVersionManager = require('./resource-managers/depository-version-manager'),
  solveBioDatasetManager = require('./resource-managers/dataset-manager');

/**
 * SolveBio Object
 * @constructor
 */

var SolveBio = function() {
  this.VERSION = config.VERSION;
  this._config = config;
  this.depository = function(id) {
    return new solveBioDepositoryManager(this, id);
  };
  this.depositoryVersion = function(id) {
    return new solveBioDepositoryVersionManager(this, id);
  };
  this.dataset = function(id) {
    return new solveBioDatasetManager(this, id);
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

SolveBio.prototype.init = function(userConfig) {
  this._config._accessToken = userConfig.accessToken;
  config.DEBUG = !!userConfig.debug;
};

var buildURL = function(url, params) {
  return url + (url.indexOf('?') > 0 ? '&' : '?') + serialize(params);
};

SolveBio.prototype.$http = function(path){
  var self = this;
  var core = {
    // AJAX call
    ajax: function(method, url, data, args) {
      if(self._config._accessToken) {
        // Returns a promise
        return new Promise(function(resolve, reject) {

          // Instantiate XMLHttpRequest
          var xhr = new XMLHttpRequest();
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
          xhr.setRequestHeader('Content-type', 'application/json');
          xhr.setRequestHeader('Authorization', 'Bearer ' + self._config._accessToken);
          xhr.send(data);

          xhr.onload = function () {
            if(this.status === 200){
              // Use 'resolve' if this.status equals 200
              var response = JSON.parse(this.response);

              // Pagination support
              if(response.links) {
                if(response.links.next) {
                  response.next = function() {
                    var nextPage = response.links.next.match(/^.*page=(\d)$/)[1];
                    var newData = _.assign(JSON.parse(data) || {}, {page: nextPage});
                    return core.ajax(method, path, newData, args);
                  };
                }

                if(response.links.prev) {
                  response.prev = function() {
                    var prevPage = response.links.prev.match(/^.*page=(\d)$/)[1];
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
              reject(JSON.parse(this.response));
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

//SolveBio.prototype._rest = function(method, path, data, success, error) {
//  if(this._config._accessToken) {
//    method = method.toUpperCase();
//    var url = '' + this._config.apiHost + '/' + path.replace(/^\/?/, '');
//    data = data || {};
//    success = success || function () {
//    };
//    error = error || function () {
//    };
//
//    if (method === 'GET' || method === 'HEAD') {
//      // serialize the data into the query parameters
//      url = buildURL(url, data);
//      data = null;
//    } else {
//      // JSONify the data into the request body
//      data = JSON.stringify(data, null, 4);
//    }
//
//    // IE6 and below are not supported
//    var xhr = new XMLHttpRequest();
//
//    xhr.onreadystatechange = function () {
//      if (xhr.readyState === 4 && xhr.status !== 200) {
//        try {
//          error(JSON.parse(xhr.responseText));
//        } catch (_error) {
//          error(xhr.responseText);
//        }
//      }
//      if (xhr.readyState === 4 && xhr.status === 200) {
//        try {
//          success(JSON.parse(xhr.responseText));
//        } catch (_error) {
//          error(xhr.responseText);
//        }
//      }
//    };
//
//    console.log('Sending ' + method + ' request to ' + url);
//    xhr.open(method, url, true);
//    xhr.setRequestHeader('Content-type', 'application/json');
//    xhr.setRequestHeader('Authorization', 'Bearer ' + this._config._accessToken);
//    xhr.send(data);
//
//    return xhr;
//  }
//  else {
//    console.error('You must initialize the SolveBio instance with a valid Token: SolveBio.init(/* configObject */)');
//  }
//};

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
if(window) {
  window.SolveBio = new SolveBio();
}
else {
  module.exports = new SolveBio();
}