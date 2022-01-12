

import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import styles from './index.less';

const MessagesPage = (props: any) => {
    console.log(props);
    const [messages, setMessages] = useState<any>([]); // 聊天记录

    useEffect(() => {
        console.log(props);
        let obj = props.data.messages;
        obj = [
            {
                msgId: '123',
                msgType: 'system',
                msgUser: 'system',
                action: 'login',
                uid: '',
                time: '2022-1-12',
            },
            {
                msgId: '1234',
                msgType: '1',
                msgUser: '张三',
                action: '我去大保健1',
                uid: '213',
                time: '2022-1-12',
            },
        ]

        if (obj.length) {
            // let _messages = JSON.parse(obj);
            setMessages(obj);
        }
    }, [props.data]);

    return (


        <div>
            <div className={styles.wxchatContainer}>
                <div className={styles.window} >
                    <ul>
                        {
                            messages.map((message: any) =>
                            (
                                <li key={message.msgId}>
                                    <Message key={message.msgId} msgType={message.msgType} msgUser={message.msgUser} action={message.action} isMe={props.index.userId === message.uid ? true : false} time={message.time} />
                                </li >
                            ))
                        }
                    </ul >

                </div>
            </div>
        </div>
    )
};

const Message = (props: any) => {
    console.log(`message:`, props);

    if (props.msgType === 'system') {
        return (
            <div className={styles.message}>
                <p className={styles.time}> <span> {props.msgUser}  {props.action === 'login' ? '进入了聊天室11' : '离开了聊天室'}</span> </p>
            </div>
        );
    } else {
        return (
            <div className={styles.message}>
                <p className={styles.time}> <span> {props.time} </span> </p>
                {/* <p className={`${styles.time} ${styles.system}`}> <span></span> </p> */}
                <div className={props.isMe ? `${styles.main} ${styles.self}` : `${styles.main}`}>
                    <img className={styles.avatar} src={`https://img1.baidu.com/it/u=2476943548,3374522247&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400`} width="45" height="45" />
                    <div className={styles.text} > {props.action} </div>
                </div>
            </div>
        )
    }
}

export default connect(
    ({ index, loading }: any) => {
        return ({
            index,
            loading: loading.models.index,
        })
    },
)(MessagesPage);