'use strict';
// 在线用户
var onlineUsers = {};
// 在线用户人数
var onlineCount = 0;
// 将收到的消息发送给客户端
module.exports = app => {
  return function* () {

    console.log(this.args);
    const obj = this.args[0];
    console.log('login 控制器打印', obj);
    this.socket.emit('message', `Hi! I've got your obj: ${obj}`);

    this.socket.id = obj.uid;

    // 如果没有这个用户，那么在线人数+1，将其添加进在线用户
    if (!onlineUsers[obj.uid]) {
      onlineUsers[obj.uid] = obj.username;
      onlineCount++;
    }

    // 向客户端发送登陆事件，同时发送在线用户、在线人数以及登陆用户
    this.socket.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
    console.log(obj.username + '加入了群聊');
  };
};
