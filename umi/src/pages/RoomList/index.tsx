import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import styles from './index.less';
import { NavBar, Icon, Popover, List, Drawer } from 'antd-mobile'

import { getGameRooms } from '@/service/api.service';

const Item = List.Item;
const Brief = Item.Brief;
const PItem = Popover.Item;
const RoomListPage = (props: any) => {
  console.log(props);

  const { dispatch } = props;

  const [gameRooms, setGameRooms] = useState<any>([]); // 房间信息


  const [isOpen, setIsOpen] = useState<any>(false); // drawer


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
    history.push({ pathname: './ChatRoom', query: { id: item.room_id } })
  }


  useEffect(() => {
    console.log(props.index);

    getGameRooms().then(res => {
      console.log(res);
      if (res?.data?.list.length) {
        console.log(res.data.list);
        setGameRooms(res.data.list)
      }
    });
  }, [props.index]);

  // 输入输出用户名

  const onOpenChange = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  }

  const onSelectUserImage = (item: any) => {
    console.log(item);
    dispatch({ type: 'index/updateImg', payload: { userImage: item } });
  }

  const arr = [1, 2, 3, 4, 5, 6]

  const myImg = (item: number) => {
    return <img onClick={() => onSelectUserImage(item)} src={require(`/src/assets/userImg/${item}.png`)} width="60" height="60" alt="" />
  };
  const sidebar = (
    <div className={styles.sidebar}>
      <img className={styles.avatar} src={require(`/src/assets/userImg/${props.index.userImage}.png`)} width="60" height="60" />
      <span>{props.index.userName}</span>
      <Popover mask
        visible={false}
        overlay={
          arr.map(item => {
            return (<div >
              {myImg(item)}
            </div>)
          })
        }
      >
        <a>选择头像</a>
      </Popover>
    </div>
  );


  return (
    <div >
      <NavBar style={{ width: '100%' }}
        mode="light"
        icon={<Icon type="left" onClick={() => {
          console.log('213');
        }} />}
        rightContent={[
          <Icon key="1" type="ellipsis" onClick={() => {
            console.log('213');
            onOpenChange()
          }} />,
        ]}
      >{'房间大厅'}</NavBar>
      <Drawer
        className={styles.myDrawer}
        style={{ minHeight: document.documentElement.clientHeight }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
        sidebarStyle={{ border: '1px solid #ddd' }}
        sidebar={sidebar}
        docked={isOpen}
      >
        <List className={styles.mylist}>
          {gameRooms.map((item: any) => {
            return <Item key={item.room_id} arrow="horizontal" multipleLine onClick={() => gotoChatRoom(item)}>
              {item.roomName} <Brief>人数:{item.peopleOnline} 人</Brief>
            </Item>
          })}
        </List>
      </Drawer>
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
)(RoomListPage);