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
  this.depository = new solveBioDepositoryManager(this);
  this.depositoryVersion = new solveBioDepositoryVersionManager(this);
  this.dataset = new solveBioDatasetManager(this);

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

var buildURL = function(url, params) {
  return url + (url.indexOf('?') > 0 ? '&' : '?') + serialize(params);
};

SolveBio.prototype.init = function(userConfig) {
  this._config._accessToken = userConfig.accessToken;
  config.DEBUG = userConfig.debug;
};

//SolveBio.prototype.$http = function(url){
//
//  var core = {
//    // AJAX call
//    ajax : function(method, url, args) {
//
//      // Returns a promise
//      return new Promise(function(resolve, reject) {
//
//        // Instantiate XMLHttpRequest
//        var client = new XMLHttpRequest();
//        var uri = url;
//
//        if(args && (method === 'POST' || method === 'PUT')) {
//          url += '?';
//          for (key in args) {
//            if (args.hasOwnProperty(key)) {
//              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]) + '&';
//            }
//          }
//        }
//
//        client.open(method, url);
//
//        client.onload = function () {
//          if(this.status == 200){
//            // Use 'resolve' if this.status equals 200
//            resolve(this.response);
//          }
//          else{
//            // Use 'reject' if this.status is different than 200
//            reject(this.statusText);
//          }
//        };
//
//        client.onerror = function () {
//          reject(this.statusText);
//        }
//      })
//    }
//  };
//
//  // Pattern adapter
//  return {
//    'get' : function(args) {
//      return core.ajax('GET', url, args);
//    },
//    'post' : function(args) {
//      return core.ajax('POST', url, args);
//    },
//    'put' : function(args) {
//      return core.ajax('PUT', url, args);
//    },
//    'delete' : function(args) {
//      return core.ajax('DELETE', url, args);
//    }
//  };
//};

SolveBio.prototype._rest = function(method, path, data, success, error) {
  if(this._config._accessToken) {
    method = method.toUpperCase();
    var url = '' + this._config.apiHost + '/' + path.replace(/^\/?/, '');
    data = data || {};
    success = success || function () {
    };
    error = error || function () {
    };

    if (method === 'GET' || method === 'HEAD') {
      // serialize the data into the query parameters
      url = buildURL(url, data);
      data = null;
    } else {
      // JSONify the data into the request body
      data = JSON.stringify(data, null, 4);
    }

    // IE6 and below are not supported
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status !== 200) {
        try {
          error(JSON.parse(xhr.responseText));
        } catch (_error) {
          error(xhr.responseText);
        }
      }
      if (xhr.readyState === 4 && xhr.status === 200) {
        try {
          success(JSON.parse(xhr.responseText));
        } catch (_error) {
          error(xhr.responseText);
        }
      }
    };

    console.log('Sending ' + method + ' request to ' + url);
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this._config._accessToken);
    xhr.send(data);

    return xhr;
  }
  else {
    console.error('You must initialize the SolveBio instance with a valid Token: SolveBio.init(/* configObject */)');
  }
};

/* REST shortcut methods */

var restShortcut = function(method) {
  SolveBio.prototype['_' + method.toLowerCase()] = function() {
    return SolveBio.prototype._rest.apply(this, [method].concat([].slice.call(arguments)));
  };
};

var restMethods = ['GET', 'PUT', 'POST', 'DELETE'];
_.forEach(restMethods, function(method) {
  restShortcut(method);
});

// Export the SolveBio object for **Node.js**,
// and add `SolveBio` as a global object.
window.SolveBio = new SolveBio();
module.exports = new SolveBio();