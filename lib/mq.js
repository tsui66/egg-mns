'use strict';

const path = require('path');
const fs = require('fs');
const AliMNS = require("ali-mns");
const assert = require('assert');

module.exports = (app) => {
  app.coreLogger.info('[egg-mns] aliyun mns connecting start...');

  const mqNames = app.config.mns.mqNames;
  const mqMap = new Map();

  for (const mqName of mqNames) {
    const filepath = path.join(app.config.baseDir, 'app/mns/mq', mqName + '.js');
    if (!fs.existsSync(filepath)) {
      app.coreLogger.warn('[egg-mns] CANNOT find the MQ logic in file:`%s` for mq=%s', filepath, mqName);
      continue;
    }
    assert(!mqMap.has(mqName), `[egg-mns] duplicate Recvp, mqName`);
    const mqCallback = require(filepath);
    const mq = new AliMNS.MQ(mqName, app.mns.account, app.config.mns.region);
    mq.notifyRecv(mqCallback);
    mqMap.set(mqName, mq);
  }
  // make sure all mq has stopped.
  app.beforeClose(function* () {
    mqMap.forEach(function* (mqItem) {
      yield mqItem.notifyStopP();
    });
    app.coreLogger.info('[egg-mns] all mq has stopped');
  });

  return mqMap;
};