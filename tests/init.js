'use strict';

var fauxJax = require('faux-jax');
fauxJax.install();

var SolveBio = require('../src/solvebio');

module.exports = function() {
  SolveBio.init({
    accessToken: 'fakeToken'
  });

  fauxJax.on('request', respond);

  function respond(request) {
    request.respond(
      200, { // status
        'Content-Type': 'application/json' // headers
      },
      JSON.stringify({ //body
        url: request.requestURL,
        links: {
          next: request.requestURL + 'page=13',
          prev: request.requestURL + 'page=11'
        }
      })
    );
  }

  return SolveBio;
};
