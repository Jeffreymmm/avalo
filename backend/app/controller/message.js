'use strict';
// 将收到的消息发送给客户端


const Controller = require('egg').Controller;

const moment = require('moment');
class MessageController extends Controller {
  async index() {
    const {
      ctx,
      app
    } = this;
    console.log(app);
    const nsp = app.io.of('/');
    let message = ctx.args[0];

    console.log(message);

    let obj = {
      msgId: String(new Date().getTime()) + Math.floor(Math.random() * 999 + 1),
      msgType: 'user',
      msgUser: message.username,
      action: message.message,
      uid: message.uid,
      userImage: message.userImage,
      time: moment().format("YYYY-MM-DD HH:mm:ss")
    }


    const res = await ctx.service.chatRoom.index({room_id:message.roomId} ) || [];
    let arr = [];

    if (res && res.length) {
      arr = JSON.parse(res[0].messages);
    } 
      arr.push(obj)

    const resMessage = await ctx.service.chatRoom.setMessage(message.roomId, arr) || [];

    console.log(message.roomId);
    nsp.to(message.roomId).emit('message', obj);

  };
}

module.exports = MessageController;