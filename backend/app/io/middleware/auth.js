'use strict';

// 这个中间件的作用是提示用户连接与断开的，连接成功的消息发送到客户端，断开连接的消息在服务端打印
module.exports = app => {

  return async (ctx, next) => {
    console.log('connect!');
    console.log(ctx);
    const { app, socket, logger, helper } = ctx;
    const id = socket.id;
    const nsp = app.io.of('/');
    const query = socket.handshake.query;
    await next();
    console.log('disconnect!');

  };

  return function* (next) {
    console.log(next)
    this.socket.emit('connected', next);
    console.log('connected!');
    yield* next;
    console.log('disconnection!');
    this.socket.emit('disconnection', next);
  };
};
