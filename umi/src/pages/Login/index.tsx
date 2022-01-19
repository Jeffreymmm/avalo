import React, { useState } from 'react';
import { connect , history   } from 'umi';
import styles from './index.less';
import { WingBlank, WhiteSpace, Card, SearchBar } from 'antd-mobile'
import io from 'socket.io-client';

const generateUid = () => String(new Date().getTime()) + Math.floor(Math.random() * 999 + 1);

const LoginPage = (props: any) => {

  const { dispatch } = props;

  // 输入输出用户名
  const [userName, setUsername] = useState('');

  const login = () => {
    // 获取用户Id
    const userId = generateUid();
    const _userName = userName ? userName : `游客${userId}`;
    dispatch({ type: 'index/save', payload: { userName: _userName, userId ,socket: io( `127.0.0.1:7002/213123=213213` || '139.9.100.223:7002')} });
    console.log(props);
    history.push('/RoomList')
  }

  return (
    <div className={styles.pageContent}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <span className={styles.title}>AVALO</span>
          <SearchBar className={styles.search} cancelText="登陆" onChange={(val) => setUsername(val)} onCancel={() => login()} showCancelButton={false} placeholder='请输入用户名称' />
        </Card.Body>
      </Card>
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
)(LoginPage);