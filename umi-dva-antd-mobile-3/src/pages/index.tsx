import React, { useContext, useState } from 'react';
import GameRoom from './components/GameRoom';
import { Context } from './context/index';
import { ContextProvider } from './context/index';

const userState = (username: any) => {
  const [user, setUsername] = useState(username);
  return [user, setUsername];
};

const generateUid = () => {
  return String(new Date().getTime()) + Math.floor(Math.random() * 999 + 1);
};

export default function () {
  return (
    <div>
      <ContextProvider>
        <App />
      </ContextProvider>
    </div>
  )
}


const App = () => {
  // 获取context中的数据
  const { state, dispatch }: any = useContext(Context);
  // 输入输出用户名
  const [user, setUsername] = userState(null);

  const handleLogin = () => {
    const uid = generateUid();
    const username = user ? user : `游客${uid}`;
    dispatch({ type: 'login', payload: { uid, username } });
    // state.socket.emit('login', { uid, username });
  };
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
    return false;
  };
  return (
    <div>
      {state.uid ? (
        // 已登录
        <GameRoom uid={state.uid} username={state.username} socket={state.socket} />
      ) : (
        // 登录界面
        <div className="login-box">
          <h2>登 陆</h2>
          <div className="input">
            <input type="text" placeholder="请输入用户名" onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} />
          </div>
          <div className="submit">
            <button type="button" onClick={handleLogin}>
              提交
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

