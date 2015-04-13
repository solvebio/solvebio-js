'use strict';

module.exports = function(app) {
  // inject:start
  require('./dataset')(app);
  require('./depository')(app);
  require('./depository-version')(app);
  require('./solvebio-resource')(app);
  // inject:end
};