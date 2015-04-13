'use strict';

module.exports = function(app) {
  // inject:start
  require('./utils')(app);
  require('./resources')(app);
  require('./resource-managers')(app);
  // inject:end
};