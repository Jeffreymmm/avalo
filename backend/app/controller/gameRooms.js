'use strict';

const Controller = require('egg').Controller;

class GameRoomsController extends Controller {
  async index() {
    const ctx = this.ctx;
    // 处理GET请求
    const gameInfoList = await ctx.service.gameRooms.index(ctx.query) || [];
    ctx.body = gameInfoList;
    ctx.status = 200;
  }
}

module.exports = GameRoomsController;
