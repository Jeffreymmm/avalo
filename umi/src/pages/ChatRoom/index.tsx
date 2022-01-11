import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import styles from './index.less';
import { List, WhiteSpace, Card, SearchBar } from 'antd-mobile'

import { getGameRooms } from '@/service/api.service';

const Item = List.Item;
const Brief = Item.Brief;

const ChatRommPage = (props: any) => {
  console.log(props);

  const [gameRooms, setGameRooms] = useState<any>([]); // 房间信息

  const gotoChatRoom = (item: any) => {
    console.log(item);
    const params = {
        room_id: item.room_id,
        roomUserName: props.index.userName,
        UserId: props.index.userId,
        roomUserIdentity: ''
      }
      console.log(props.index.socket);
      
      props.index.socket.emit('login', params);
  }


  useEffect(() => {
    getGameRooms().then(res => {
      console.log(res);
      if (res?.data?.list.length) {
        console.log(res.data.list);
        setGameRooms(res.data.list)
      }
    });
  }, [props.index]);

  // 输入输出用户名

  return (
    <div className={styles.pageContent}>
      <List renderHeader={() => '房间大厅'} className={styles.mylist}>
        {gameRooms.map((item: any) => {
          return <Item key={item.room_id} arrow="horizontal" multipleLine onClick={() => gotoChatRoom(item)}>
            {item.roomName} <Brief>人数：{item.peopleNumber} 人</Brief>
          </Item>
        })}
      </List>
    </div>
  );
}

// export default LoginPage;

export default connect(
  ({ index, loading }: any) => {
    return ({
      index,
      loading: loading.models.index,
    })
  },
)(ChatRommPage);