'use strict';
const  url  = '/api/v1'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  io.of('/').route('login', controller.login.index);
  io.of('/').route('message', controller.message.index);
  // 这里表示对于监听到的 login 事件，将由 app/io/controller/login.js 处理
  router.resources( `${url}/gameRooms`, controller.gameRooms); 
  router.resources( `${url}/chatRoom`, controller.chatRoom); 

};
