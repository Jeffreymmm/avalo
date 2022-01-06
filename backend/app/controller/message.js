'use strict';

// 将收到的消息发送给客户端
module.exports = app => {
  return function* () {

    console.log(this.args);
    const message = this.args[0];
    console.log('login 控制器打印', message);
    this.socket.emit('message', message);
  };
};
