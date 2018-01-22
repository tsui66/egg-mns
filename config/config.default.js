'use strict';

const  AliMNS = require("ali-mns");

module.exports = appInfo => {
  const config = {};

  config.mns = {
    default: {
      aliyunAccountId: process.env.aliyunAccountId || "your-account-id",
      aliyunKey: process.env.aliyunKey || "your-key-id",
      aliyunSecret: process.env.aliyunSecret || "your-key-secret",
      region: process.env.TRAVIS == "true" ? new AliMNS.Region(AliMNS.City.SiliconValley): new AliMNS.Region(AliMNS.City.Hangzhou),
    },
    mqNames: process.env.aliyunMqName || [],
    GA: true, // enable google analytics data collection
    https: false, // using http or https protocol, default is false for using http protocol.
    app: true,
  };

  return config;
};
