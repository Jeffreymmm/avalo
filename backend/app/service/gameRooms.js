"use strict";

const Service = require("egg").Service;
const TABLE_NAME = "gameRooms";
class GameRoomsService extends Service {

  async index(params) {
    // 获取查询参数

    let arr =   await this.app.mysql.select(TABLE_NAME);
    let res = {};
    res.list = arr;
    return res
    // 返回查询结果
  }
}

module.exports = GameRoomsService;
