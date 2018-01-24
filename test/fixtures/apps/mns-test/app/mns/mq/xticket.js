'use strict';

class XTicketSubscriber {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
  }

  async subscribe(msg) {
    console.log(msg, '.........###################.....')
  }
}

module.exports = XTicketSubscriber;
