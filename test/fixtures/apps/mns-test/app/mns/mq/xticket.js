'use strict';

module.exports = app => {
  return function (err, message) {
    console.log(message);
    if(err && err.message === "NetworkBroken"){
        // Best to restart the process when this occurs
        throw err;
    }
    return true; // this will cause message to be deleted automatically
  }
};