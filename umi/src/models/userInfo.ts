import { Effect, Reducer, Subscription } from 'umi';
import io from 'socket.io-client';
import proxy from '../../config/proxy';
const { REACT_APP_ENV, USE_TABS, SERVER_ADDRESS,LOGO_TYPE } = process.env;

export interface UserInfoState {
  userName: string;
  userId: string;
  socket:any;

}

export interface IndexModelType {
  namespace: 'index';
  state: UserInfoState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<UserInfoState>;
    // 启用 immer 之后
    // save: ImmerReducer<UserInfoState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index',
  state: {
    userName: '',
    userId: '',
    socket: io( `127.0.0.1:7002` || '139.9.100.223:7002'),
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        console.log(pathname);
      });
    },
  },
};

export default IndexModel;