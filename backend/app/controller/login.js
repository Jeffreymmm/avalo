"use strict";
// 在线用户
// 在线用户人数
// 将收到的消息发送给客户端
module.exports =   (app) => {
  return  function*  () {
    console.log(this.args);
    const obj = this.args[0];
    console.log("login 控制器打印", obj);
    const {room_id, roomUserName, roomUserIdentity, UserId } = obj
    let result 
     yield*  result =  this.app.mysql.insert("roomUser", { room_id, roomUserName, roomUserIdentity, UserId});
    console.log(result);
    // if (result.affectedRows === 1) {

    // } else {

    // }

    // this.socket.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
    // console.log(obj.username + '加入了群聊');
  };
};
