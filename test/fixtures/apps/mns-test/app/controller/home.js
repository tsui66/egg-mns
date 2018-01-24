'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // console.log(this.ctx.mns.mq, '**********************')
    this.ctx.body = await this.ctx.mns.mq.get('xticket').sendP('how');
  }
}

module.exports = HomeController;
