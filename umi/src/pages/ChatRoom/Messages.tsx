

import React, { useRef, useEffect, useReducer, useState, createRef } from 'react';
import { connect, history } from 'umi';
import styles from './index.less';
import _ from 'lodash';

const MessagesPage = (props: any) => {
    console.log(props);
    // const [messages, setMessages] = useState<any>([]); // 聊天记录

    const INIT_STATE = {
        'messages': []
    }

    const reducer = (state: any, action: any) => {

        switch (action.code) {
            case 'updateMsg':
                return { ...state, 'messages': [...action.payload] };
            case 'addMsg':
                return { ...state, 'messages': [...state.messages, action.payload] };
        }
    }


    const [state, dispatch] = useReducer(reducer, INIT_STATE);


    useEffect(() => {
        console.log(props);
        if (props.data && props.data.messages && props.data.messages.length) {
            let obj = props.data.messages;
            let _messages = JSON.parse(obj);
            dispatch({ code: 'updateMsg', payload: _messages })
        }

    }, [props.data.messages]);


    const [isInitSocket, setIsInitSocket] = useState<boolean>(false)

    const messagesEndRef: any = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        if (!isInitSocket) {
            console.log(`初始化socket`);
            props.index.socket.on('message', (events: any) => {
                console.log(events);
                dispatch({ code: 'addMsg', payload: events });
            });

            props.index.socket.on('connected', (events: any) => {
                console.log('connected',events);
            });

            props.index.socket.on('disconnection', (events: any) => {
                console.log('disconnection',events);
            });
            setIsInitSocket(true);
        }
    }, [props.index.socket]);


    useEffect(() => {
        scrollToBottom()
    }, [state.messages])

    return (
        <div style={{ height: '100%;' }}>
            <div className={styles.wxchatContainer}>
                <div className={styles.window} >
                    <ul style={{ height: '100%;' }} >
                        {
                            state.messages.map((message: any) =>
                            (
                                <li key={message.msgId}>
                                    <Message userImage={message.userImage} key={message.msgId} msgType={message.msgType} msgUser={message.msgUser} action={message.action} isMe={props.index.userName === message.            // props.index.socket.emit('message', obj);
                                        msgUser ? true : false} time={message.time} />
                                </li >
                            ))
                        }
                        <div ref={messagesEndRef} />
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
                <p className={styles.time}> <span> {props.msgUser}  {props.action === 'login' ? '进入了聊天室' : '离开了聊天室'}</span> </p>
            </div>
        );
    } else {
        return (
            <div className={styles.message}>
                <p className={styles.time}> <span> {props.time} </span> </p>
                {/* <p className={`${styles.time} ${styles.system}`}> <span></span> </p> */}
                <div style={{
                        position: "relative"
                    }} className={props.isMe ? `${styles.main} ${styles.self}` : `${styles.main}`}>
                    <img className={styles.avatar} src={require(`/src/assets/userImg/${props.userImage}.png`)} width="45" height="45" />
                    <span style={{position: "absolute",top: "-7vw"
                    }}>{props.msgUser}</span>
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