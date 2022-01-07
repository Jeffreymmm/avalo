import React, { useContext, useState, useEffect } from 'react';

import { Context } from '../context';

import { getGameRooms } from '../service/api.service';

import { List } from 'antd-mobile';
import router from 'umi/router';
const Item = List.Item;
const Brief = Item.Brief;

const GameRoom = (props: any) => {
  console.log(props);
  console.log();
  
  const { state, dispatch }: any = useContext(Context);
  const [gameRooms, setGameRooms] = useState<any>([]); // 房间信息
  const [selectGameRoom, setSelectGameRoom] = useState<any>({}); // 房间信息
  console.log(state);
  useEffect(() => {
    getGameRooms().then(res => {
      console.log(res);
      if (res?.data?.list.length) {
        console.log(res.data.list);
        setGameRooms(res.data.list)
      }
    });
  }, [state.uid]);
  console.log(selectGameRoom);
  const gotoChatRoom = (item: any) => {
    console.log(item);
    setSelectGameRoom(item);

    const params = {
      room_id: item.room_id,
      roomUserName: state.username,
      UserId: state.uid,
      roomUserIdentity: ''
    }
    state.socket.emit('login', params);
  }


  // 监听消息发送
  const ready = () => {
    console.log(this);
    console.log(selectGameRoom);

  };

  useEffect(() => {
    const { socket } = props;
    if(!socket) return;
    socket.on('gotoRoom', (o: any) => {
      console.log(o);
      router.push({pathname:'./ChatRoom',query:{id:o.room_id }})
    });
  }, [props.socket,selectGameRoom]);

  return (
    <div className="chat-room">
      <List renderHeader={() => '房间大厅'} className="my-list">
        {gameRooms.map((item: any) => {
          return <Item key={item.room_id} arrow="horizontal" multipleLine onClick={() => gotoChatRoom(item)}>
            {item.roomName} <Brief>人数：{item.peopleNumber} 人</Brief>
          </Item>
        })}
      </List>
    </div>
  );
};
export default GameRoom;

