"use strict";

const Service = require("egg").Service;
const TABLE_NAME = "gameRooms";
class ChatRoomService extends Service {

  async index(params) {
    // 获取查询参数
    const { room_id }  = params;

   await this.app.mysql.select(TABLE_NAME);

    let getResult = await this.app.mysql.query(
      'select * from gameRooms where room_id=?', [room_id]
    );
    return getResult
    // 返回查询结果
  }
}

module.exports = ChatRoomService;
