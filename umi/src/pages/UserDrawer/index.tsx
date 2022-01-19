
import React, { useState, useEffect } from 'react';
import { connect, history } from 'umi';
import styles from './index.less';
import { NavBar, Icon, Popover, List, Drawer } from 'antd-mobile'

import { getGameRooms } from '@/service/api.service';

const UserDrawer = (props: any) => {

    console.log(props);


    const sidebar = (
        <div className={styles.sidebar}>
            <img className={styles.avatar} src={`https://img1.baidu.com/it/u=2476943548,3374522247&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400`} width="45" height="45" />
            <span>{props.index.userName}</span>
            <Popover mask
                visible={true}
                overlay={(
                    <div>123</div>
                )}
            >
                <div style={{
                    height: '100%',
                    padding: '0 15px',
                    marginRight: '-15px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                    <Icon type="ellipsis" />
                </div>
            </Popover>
        </div>
    );

    return (
        <Drawer
            className={styles.myDrawer}
            style={{ minHeight: document.documentElement.clientHeight }}
            contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
            sidebarStyle={{ border: '1px solid #ddd' }}
            sidebar={sidebar}
            docked={props.isOpen}
        >
            {props.Children}
        </Drawer>
    )
}

export default connect(
    ({ index, loading }: any) => {
        return ({
            index,
            loading: loading.models.index,
        })
    },
)(UserDrawer);