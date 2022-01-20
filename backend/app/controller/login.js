'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const {
      ctx,
      app
    } = this;

    const nsp = app.io.of('/');
    let info = ctx.args[0]

    const {
      room_id,
      roomUserName,
      roomUserIdentity,
      UserId
    } = info;


    // 加入房间
    ctx.socket.join(room_id);

    let obj = {
      action: '',
      msgId:String(new Date().getTime()) + Math.floor(Math.random() * 999 + 1),
      msgType: 'system',
      msgUser: info.roomUserName || '测试用户',
      action: `login`,
      time: new Date().getTime()
    }
    await nsp.to(room_id).emit('system', obj)
  }
    // 查询一条数据，不管条件是什么，只能查一条
    //   let getResult = await this.app.mysql.query(
    //     'select * from roomUser where roomUserName=?', [roomUserName]
    //   );

    //   if (!(getResult && getResult.length)) {
    //     let insertRes = await this.app.mysql.insert("roomUser", {
    //       room_id,
    //       roomUserName,
    //       roomUserIdentity,
    //       UserId
    //     });
    //     if (insertRes.affectedRows === 1) {
    //       let sql = "update gameRooms set peopleOnline = peopleOnline+1 where room_id in (?)"
    //       let updateRes = await this.app.mysql.query(sql, [room_id]);
    //     }
    //   } else {
    //     let sql = "update gameRooms set peopleOnline = peopleOnline+1 where room_id in (?)"
    //     let updateRes = await this.app.mysql.query(sql, [room_id]);
    //   }
    // };
  }

  module.exports = LoginController;