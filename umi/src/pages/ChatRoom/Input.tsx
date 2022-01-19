

import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import styles from './index.less';
import { Button } from 'antd-mobile'

const InputPage = (props: any) => {
    console.log(props);

    const [inputMessage, setInputMessage] = useState('');


    const sendMessage = () => {
        if (inputMessage) {
            const obj = {
                uid: props.index.userId,
                username: props.index.userName,
                message: inputMessage,
                roomId: props.roomId,
                userImage:props.index.userImage,
            };

            props.index.socket.emit('message', obj);

        }
        setInputMessage('');
    }

    return (
        <div className={styles.inputContent}>
            <input type="\" value={inputMessage} onChange={(val: any) => {
                setInputMessage(val.target.value)
            }} />
            <Button onClick={() => sendMessage()} type="primary" size="small" style={{ marginLeft: '4px' }} >发送</Button>
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
)(InputPage);