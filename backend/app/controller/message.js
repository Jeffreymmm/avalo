'use strict';

// 将收到的消息发送给客户端
module.exports = app => {
  return function* () {

    console.log(this.args);
    const message = this.args[0];
    console.log('login 控制器打印', message);
    let obj = {
      msgId: String(new Date().getTime()) + Math.floor(Math.random() * 999 + 1),
      msgType: 'user',
      msgUser: message.username,
      action: message.message,
      uid: message.uid,
      time: new Date()
    }
    this.socket.emit('message', obj);
  };
};


'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  async index() {
    const {
      ctx,
      app
    } = this;

    const nsp = app.io.of('/');
    let message = ctx.args[0]
    let obj = {
      msgId: String(new Date().getTime()) + Math.floor(Math.random() * 999 + 1),
      msgType: 'user',
      msgUser: message.username,
      action: message.message,
      uid: message.uid,
      time: new Date()
    }


    const res = await ctx.service.chatRoom.index({room_id:message.roomId} ) || [];
    console.log(`res:`, res);
    let arr = [];

    if (res && res.length) {
      arr = JSON.parse(res[0].messages);
    } 
      arr.push(obj)

    const resMessage = await ctx.service.chatRoom.setMessage(message.roomId, arr) || [];

    console.log(resMessage);

    nsp.emit('message', obj);

  };
}

module.exports = MessageController;