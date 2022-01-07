'use strict';

const Controller = require('egg').Controller;

class ChatRoomController extends Controller {
  async index() {
    const ctx = this.ctx;
    // 处理GET请求
    const res = await ctx.service.chatRoom.index(ctx.query) || [];
    console.log(res);
    ctx.body = res[0];
    ctx.status = 200;
  }
}

module.exports = ChatRoomController;
