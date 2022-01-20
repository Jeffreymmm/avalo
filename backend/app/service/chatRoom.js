"use strict";

const Service = require("egg").Service;
const TABLE_NAME = "gameRooms";
class ChatRoomService extends Service {

  async index(params) {
    // 获取查询参数
    const {
      room_id
    } = params;

    let getResult = await this.app.mysql.query(
      'select * from gameRooms where room_id=?', [room_id]
    );
    return getResult
    // 返回查询结果
  }
  // 根据主键修改数据
  async setMessage(roomId, arr) {
    let messages = {
      room_id: roomId,
      messages: JSON.stringify(arr)
    };
    let updateResultById = await this.app.mysql.query(
      'update gameRooms set messages =? where room_id=?',[JSON.stringify(arr),roomId]
  );

    return updateResultById;
  }
}

module.exports = ChatRoomService;