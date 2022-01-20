'use strict';

const Controller = require('egg').Controller;

class LeaveController extends Controller {
    async index() {
        const {
            ctx,
            app
        } = this;

        const nsp = app.io.of('/');
        let info = ctx.args[0]



        // 加入房间


        let obj = {
            action: '',
            msgId: String(new Date().getTime()) + Math.floor(Math.random() * 999 + 1),
            msgType: 'system',
            msgUser: info.roomUserName || '测试用户',
            action: `logout`,
            time: new Date().getTime()
        }
        console.log(obj);
        await nsp.to(info.roomId).emit('system', obj)
        ctx.socket.leave(info.roomId);

    }
}

module.exports = LeaveController;