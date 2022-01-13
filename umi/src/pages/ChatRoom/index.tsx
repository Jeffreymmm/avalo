import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import styles from './index.less';
import { NavBar, Icon, Flex, SearchBar } from 'antd-mobile'
import { getChatRoom } from '@/service/api.service';
import MessagesPage from './Messages';
import InputPage from './Input';
const ChatRoomPage = (props: any) => {
  console.log(props);

  const [chatRoom, setChatRoom] = useState<any>({}); // 房间信息



  useEffect(() => {
    console.log(props.location.query.id);
    let params = {
      id: props.location.query.id
    }
    getRoomInfo(params)

  }, [props.location.query.id]);
  const getRoomInfo = (params: { id: any; }) => {
    getChatRoom(params).then((res: any) => {
      console.log(res.data);
      if(res.data ) {
        setChatRoom(res.data)
      }
    })
  }

  const gotoRoomList = () => {
    history.goBack();
  }

  return (
    <div>
      <Flex style={{ height: '100vh' }} direction="column">
        <NavBar style={{ width: '100%' }}
          mode="light"
          icon={<Icon type="left" onClick={() => gotoRoomList()} />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >{chatRoom.roomName}</NavBar>
        <Flex.Item style={{ width: '100%' , overflow: 'auto'}}>
          <MessagesPage data={chatRoom} roomId={props.location.query.id} />
        </Flex.Item>
        <InputPage roomId={props.location.query.id} />
      </Flex>

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
)(ChatRoomPage);