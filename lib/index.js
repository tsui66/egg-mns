'use strict';

const region = require('./region');

module.exports = app => {
  app.mns = {};

  Object.assign(app.mns, { region });
  const account = require('./account')(app);
  const mqMap = require('./mq')(app);
  
  Object.assign(app.mns, { 
    account,
    mq: mqMap,
  });
};