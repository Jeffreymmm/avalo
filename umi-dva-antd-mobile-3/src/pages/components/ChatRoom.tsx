import React, { useContext, useState, useEffect } from 'react';
import Messages from './Messages';
import ChatInput from './ChatInput';
import { Context } from '../context';
import { ContextProvider } from '../context/index';
import { getChatRoom } from '../service/api.service';


// 生成消息id
const generateMsgId = () => {
  return String(new Date().getTime()) + Math.floor(Math.random() * 899 + 100);
};

// 时间格式
const generateTime = () => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const hourText = hour === 0 ? '00' : String(hour);
  const minuteText = minute < 10 ? '0' + minute : String(minute);
  return hourText + ':' + minuteText;
};




const Room = (props: any) => {
  console.log(props);
  
  const { state, dispatch }: any = useContext(Context);
  const [chatRoom, setChatRoom] = useState<any>({}); // 房间信息
  console.log(state);
  
  const updateSysMsg = (o: { user: { username: any; uid: any; }; onlineCount: any; onlineUsers: any; }, action: string) => {
    const newMsg = { type: 'system', username: o.user.username, uid: o.user.uid, action: action, msgId: generateMsgId(), time: generateTime() };
    dispatch({
      type: 'UPDATE_SYSTEM_MESSAGE',
      payload: {
        onlineCount: o.onlineCount,
        onlineUsers: o.onlineUsers,
        message: newMsg
      }
    });
  };

  // 发送新消息
  const updateMsg = (obj: { username: any; uid: any; message: any; }) => {
    console.log(obj);

    const newMsg = { type: 'chat', username: obj.username, uid: obj.uid, action: obj.message, msgId: generateMsgId(), time: generateTime() };
    dispatch({
      type: 'UPDATE_USER_MESSAGE',
      payload: {
        message: newMsg
      }
    });

    // dispatch({
    //   type: 'UPDATE_ROOM_INFO',
    //   payload: {
    //     onlineCount: selectGameRoom.peopleNumber,
    //     onlineUsers: selectGameRoom.onlineUsers,
    //   }
    // });
  };


  useEffect(() => {
    console.log(props.data.location.query.id);
    let params = {
      id: props.data.location.query.id
    }
    getRoomInfo(params)

  }, [props.data.location.query.id]);


  const getRoomInfo = (params: { id: any; }) => {
    getChatRoom(params).then((res: any)=> {
      console.log(res.data);
      setChatRoom(res.data)
      
      const newMsg = { type: 'system', username: '张三', uid: '444', action: 'login', msgId: generateMsgId(), time: generateTime() };
      dispatch({
        type: 'UPDATE_SYSTEM_MESSAGE',
        payload: {
          onlineCount: res.data.peopleOnline,
          onlineUsers: JSON.parse(res.data.onlineUsers),
          message: newMsg
        }
      });

    })
  }

  // 监听消息发送
  const ready = () => {
    const { socket } = state.socket;
    if (!socket) return;
    socket.on('login', (o: any) => {
      updateSysMsg(o, 'login');
    });
    socket.on('logout', (o: any) => {
      updateSysMsg(o, 'logout');
    });
    socket.on('message', (obj: any) => {
      updateMsg(obj);
    });
  };

  const renderUserList = () => {
    const users = state.onlineUsers;
    let userhtml = '';
    let separator = '';
    for (const key in users) {
      if (users.key) {
        userhtml += separator + users[key];
        separator = '、';
      }
    }
    return userhtml;
  };
  return (
    <div className="chat-room">
      <div className="welcome">
        <div className="room-action">
          <div className="room-name">{chatRoom.roomName}的聊天室 | {props.username}</div>
          <div className="button">
            <button onClick={() => window.location.reload()}>登出</button>
          </div>
        </div>
      </div>
      <div className="room-status">
        在线人数: {state.onlineCount}, 在线列表: {renderUserList()}
      </div>
      <div>
        <Messages messages={state.messages} myId={props.uid} />
        <ChatInput myId={props.uid} myName={props.username} socket={props.socket} />
      </div>
    </div>
  );
};
export default function (props: any) {
  return (
    <div>
      <ContextProvider>
        <Room data={props} />
      </ContextProvider>
    </div>
  )
}