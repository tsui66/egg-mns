'use strict';

const AliMNS = require("ali-mns");
const assert = require('assert');

module.exports = app => {
  console.log(app.config.mns.default, app.config.mns.default.aliyunAccountId && app.config.mns.default.aliyunAccountId.length !== 0,'.........')
  assert(app.config.mns.default.aliyunAccountId && app.config.mns.default.aliyunAccountId.length !== 0, `[egg-mns] aliyun accountId: ${app.config.mns.default.aliyunAccountId} are required on config`);
  assert(app.config.mns.default.aliyunKey && app.config.mns.default.aliyunKey.length !== 0, `[egg-mns] aliyun key: ${app.config.mns.default.aliyunKey} are required on config`);
  assert(app.config.mns.default.aliyunSecret && app.config.mns.default.aliyunSecret.length !== 0, `[egg-mns] aliyun secret: ${app.config.mns.default.aliyunSecret} are required on config`);
  const account = new AliMNS.Account(app.config.mns.default.aliyunAccountId, app.config.mns.default.aliyunKey, app.config.mns.default.aliyunSecret);

  if (app.config.GA === false) {
    app.coreLogger.info('[egg-mns] disable google analytics data collection');
    // Disable google analytics data collection
    account.setGA(false);
  }

  if (app.config.https === true) {
    app.coreLogger.info('[egg-mns] aliyun mns will use https protocol');
    // using http or https protocol
    account.setHttps(true);
  }

  Object.assign(app.mns, { account });
  
  return account;
};