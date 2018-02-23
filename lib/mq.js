'use strict';

const path = require('path');
const fs = require('fs');
const AliMNS = require("ali-mns");
const assert = require('assert');

module.exports = (app) => {
  app.coreLogger.info('[egg-mns] aliyun mns connecting start...');

  let mqNames = app.config.mns.mqNames || [];
  const mqMap = new Map();
  if (mqNames === '') mqNames = [];
  if (!Array.isArray(mqNames)) {
    if (mqNames.startsWith('[') && mqNames.endsWith(']')) {
      mqNames = JSON.parse(mqNames);
    } else {
      mqNames = [ mqNames ];
    }
  }
  for (const mqName of mqNames) {
    const mq = new AliMNS.MQ(mqName, app.mns.account, app.mns.region(app.config.mns.region));
    assert(!mqMap.has(mqName), `[egg-mns] duplicate Recvp, mqName`);
    mqMap.set(mqName, mq);
    
    const filepath = path.join(app.config.baseDir, 'app/mns/mq', mqName + '.js');
    if (!fs.existsSync(filepath)) {
      app.coreLogger.warn('[egg-mns] CANNOT find the MQ logic in file:`%s` for mq=%s', filepath, mqName);
      continue;
    }
    const Subscriber = require(filepath);
    
    try {
      mq.notifyRecv(async function (err, message) {
        if (err) {
          app.coreLogger.error(`[egg-mns] handle notifyRecv error`, err);
          return false;
        }
        const ctx = app.createAnonymousContext();
        const subscriber = new Subscriber(ctx);
        try {
          return await subscriber.subscribe(message);
          // return false;
        } catch(err) {
          return false;
        }
      });
    } catch(err) {
      app.coreLogger.error(`[egg-mns] handle logic error`, err);
    }
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