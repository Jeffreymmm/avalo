import React, { useContext, useState, useEffect } from 'react';

import { Context } from '../context';

import { getGameRooms } from '../service/api.service';

import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const GameRoom = (props: any) => {
  const { state, dispatch }: any = useContext(Context);
  const [init, setInit] = useState(false);


  const [gameRooms, setGameRooms] = useState<any>([]); // 房间信息

  useEffect(() => {
    getGameRooms().then(res => {
      console.log(res);
      if (res?.data?.list.length) {
        console.log(res.data.list);
        setGameRooms(res.data.list)
      }
    });
  }, [state.uid]);

  const gotoChatRoom = () => {
    console.log('123');
    
    state.socket.emit('login', {a:123 });
  }

  return (
    <div className="chat-room">
      <List renderHeader={() => '房间大厅'} className="my-list">
        {gameRooms.map((item: any) => {
          return <Item arrow="horizontal" multipleLine onClick={() => gotoChatRoom }>
            {item.roomName} <Brief>人数：{item.peopleNumber} 人</Brief>
          </Item>
        })}
      </List>
    </div>
  );
};
export default GameRoom;

