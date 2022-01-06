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

    // 1.查询一条数据，不管条件是什么，只能查一条

    let getResult = await this.app.mysql.query(
      'select * from roomUser where UserId=?', [UserId]
    );

    if (!(getResult && getResult.length)) {
      let insertRes = await this.app.mysql.insert("roomUser", {
        room_id,
        roomUserName,
        roomUserIdentity,
        UserId
      });
      if (insertRes.affectedRows === 1) {
        await nsp.emit('gotoRoom',info)
      }
    } else {
      await nsp.emit('gotoRoom',info)
    }
  };
}

module.exports = LoginController;