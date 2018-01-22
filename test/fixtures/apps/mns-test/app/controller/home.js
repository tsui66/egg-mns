'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = await this.ctx.mns.mq.get('xticket').sendP('how');
  }
}

module.exports = HomeController;
