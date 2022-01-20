'use strict';

// 这个中间件的作用是提示用户连接与断开的，连接成功的消息发送到客户端，断开连接的消息在服务端打印

module.exports = () => {
  return async (ctx, next) => {
    // 权限校验通过
    console.log('用户连接');

    // 放行
    await next();
    console.log('断开连接:', ctx);
  }
};

// module.exports = app => {

//   return async (ctx, next) => {
//     console.log('connect!');
//     const { app, socket, logger, helper } = ctx;
//     const id = socket.id;
//     const nsp = app.io.of('/');

//     console.log(ctx);
//     console.log(`nsp`,nsp);
//     const query = socket.handshake.query;
//     await next();
//     console.log('disconnect!');

//   };

//   return function* (next) {
//     console.log(next)
//     this.socket.emit('connected', next);
//     console.log('connected!');
//     yield* next;
//     console.log('disconnection!');
//     this.socket.emit('disconnection', next);
//   };
// };