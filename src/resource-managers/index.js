'use strict';

module.exports = function(app) {
  // inject:start
  require('./dataset-manager')(app);
  require('./depository-manager')(app);
  require('./depository-version-manager')(app);
  require('./solvebio-resource-manager')(app);
  // inject:end
};