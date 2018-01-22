'use strict';

const AliMNS = require("ali-mns");

module.exports = (...args) => {
  return new AliMNS.Region(...args);
};