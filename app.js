'use strict';

module.exports = app => {
  if (app.config.mns.app) require('./lib/index')(app);
};