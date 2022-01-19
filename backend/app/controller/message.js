'use strict';
// 将收到的消息发送给客户端

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
      userImage: message.userImage,
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
    console.log('发送：',obj);
    nsp.emit('message', obj);

  };
}

module.exports = MessageController;